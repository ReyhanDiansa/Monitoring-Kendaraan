// pages/news/edit/[id].tsx\
"use client";
import React from "react";
import { useParams } from "next/navigation";
import UserForm from "../../../../../components/User/UserForm";
import Layout from "../../../../../components/Layout/layout";

const EditUserPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <UserForm id={Number(id)} />
    </Layout>
  );
};

export default EditUserPage;
