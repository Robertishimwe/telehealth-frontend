/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import AppBar from '../components/home/AppBar';
import PageLayout from '../components/home/Home';
import ProductValues from '../components/home/ProductValues';
import ProductCategories from '../components/home/ProductCategories';
import ProductHow from '../components/home/ProductHow';
import AppFooter from '../components/home/AppFooter';

function index() {
  return (
    <Fragment>
      <AppBar />
      <PageLayout />
      <ProductValues />
      <ProductCategories />
      <ProductHow />
      <AppFooter />
    </Fragment>
  );
}

export default index;
