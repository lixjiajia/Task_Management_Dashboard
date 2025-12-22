# backend/schema.py
import graphene
from graphene import ObjectType, String, Boolean, Int, Field, List, Date
from models import Employee, Task, SessionLocal

class TaskType(graphene.ObjectType):
    id = Int()
    task_title = String()
    task_description = String()
    task_date = Date()
    category = String()
    active = Boolean()
    new_task = Boolean()
    completed = Boolean()
    review = Boolean()

class EmployeeType(graphene.ObjectType):
    id = Int()
    first_name = String()
    email = String()
    password = String()
    tasks = List(TaskType)

class Query(ObjectType):
    employees = List(EmployeeType)
    employee = Field(EmployeeType, id=Int(required=True))
    tasks = List(TaskType)  # Add query for all tasks

    def resolve_employees(root, info):
        session = SessionLocal()
        emps = session.query(Employee).all()
        return emps

    def resolve_employee(root, info, id):
        session = SessionLocal()
        emp = session.query(Employee).get(id)
        return emp

    def resolve_tasks(root, info):
        session = SessionLocal()
        tasks = session.query(Task).all()
        return tasks

class CreateEmployee(graphene.Mutation):
    class Arguments:
        first_name = String(required=True)
        email = String(required=True)
        password = String(required=True)

    ok = Boolean()
    employee = Field(lambda: EmployeeType)

    def mutate(self, info, first_name, email, password):
        session = SessionLocal()
        try:
            emp = Employee(first_name=first_name, email=email, password=password)
            session.add(emp)
            session.commit()
            session.refresh(emp)  # Refresh to ensure object is properly loaded
            return CreateEmployee(ok=True, employee=emp)
        finally:
            session.close()

class DeleteEmployee(graphene.Mutation):
    class Arguments:
        id = Int(required=True)

    ok = Boolean()
    employee = Field(lambda: EmployeeType)

    def mutate(self, info, id):
        session = SessionLocal()
        try:
            emp = session.query(Employee).get(id)
            if not emp:
                return DeleteEmployee(ok=False, employee=None)
            # Store employee data before deletion for return
            deleted_emp = emp
            session.delete(emp)
            session.commit()
            return DeleteEmployee(ok=True, employee=deleted_emp)
        finally:
            session.close()

class CreateTask(graphene.Mutation):
    class Arguments:
        employee_id = Int(required=True)
        task_title = String(required=True)
        task_description = String()
        task_date = Date()
        category = String()

    ok = Boolean()
    task = Field(lambda: TaskType)

    def mutate(self, info, employee_id, task_title, task_description=None, task_date=None, category=None):
        session = SessionLocal()
        try:
            t = Task(
                employee_id=employee_id,
                task_title=task_title,
                task_description=task_description,
                task_date=task_date,
                category=category,
                active=True,
                new_task=True,
                completed=False,
                review=False
            )
            session.add(t)
            session.commit()
            session.refresh(t)  # Refresh to ensure object is properly loaded
            return CreateTask(ok=True, task=t)
        finally:
            session.close()

class UpdateTaskStatus(graphene.Mutation):
    class Arguments:
        task_id = Int(required=True)
        status = String(required=True)  # 'accept', 'complete', 'review'

    ok = Boolean()
    task = Field(lambda: TaskType)

    def mutate(self, info, task_id, status):
        session = SessionLocal()
        try:
            task = session.query(Task).get(task_id)
            if not task:
                return UpdateTaskStatus(ok=False, task=None)

            # Reset all statuses
            task.active = False
            task.new_task = False
            task.completed = False
            task.review = False

            if status == 'accept':
                task.active = True
                task.new_task = False
            elif status == 'complete':
                task.completed = True
                task.active = False
            elif status == 'review':
                task.review = True
                task.active = False

            session.commit()
            session.refresh(task)  # Refresh to ensure object is properly loaded
            return UpdateTaskStatus(ok=True, task=task)
        finally:
            session.close()

class DeleteTask(graphene.Mutation):
    class Arguments:
        task_id = Int(required=True)

    ok = Boolean()
    task = Field(lambda: TaskType)

    def mutate(self, info, task_id):
        session = SessionLocal()
        try:
            task = session.query(Task).get(task_id)
            if not task:
                return DeleteTask(ok=False, task=None)
            # Store task data before deletion for return
            deleted_task = task
            session.delete(task)
            session.commit()
            return DeleteTask(ok=True, task=deleted_task)
        finally:
            session.close()

class Mutation(ObjectType):
    create_employee = CreateEmployee.Field()
    delete_employee = DeleteEmployee.Field()
    create_task = CreateTask.Field()
    update_task_status = UpdateTaskStatus.Field()
    delete_task = DeleteTask.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
