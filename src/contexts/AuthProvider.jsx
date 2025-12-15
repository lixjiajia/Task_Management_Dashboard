import React, { createContext, useEffect, useState } from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export const AuthContext = createContext();

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      email
      password
      tasks {
        id
        taskTitle
        completed
        review
        newTask
        active
      }
    }
  }
`;

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const { data, loading, error } = useQuery(GET_EMPLOYEES);

  useEffect(() => {
    if (data && data.employees) {
      setUserData(data.employees);
    }
  }, [data]);

  if (loading) {
    return <p className="text-white text-center mt-8">Loading employees...</p>;
  }

  if (error) {
    console.error(error);
    return <p className="text-red-400 text-center mt-8">Error loading data</p>;
  }

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
