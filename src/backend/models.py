# backend/models.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    tasks = relationship("Task", back_populates="employee", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    task_title = Column(String)
    task_description = Column(String)
    task_date = Column(Date)
    category = Column(String)
    active = Column(Boolean)
    new_task = Column(Boolean)
    completed = Column(Boolean)
    review = Column(Boolean)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    employee = relationship("Employee", back_populates="tasks")

engine = create_engine("sqlite:///db.sqlite3")
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(engine)
