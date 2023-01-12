import mysqlRequest from "../requests/mysqlRequest.request"
import queryBuilder from "../services/queryBuilder.service"
import responseCode from "../constants/responseCode"
import format from "date-fns/format"
import distanceCalculator, { SUPPORTED_UNIT } from 'distance-calculator-js';
import knex from '../../src/services/queryBuilder.service'

// Get Top Banner List

export const bannerList = async () => {
    const response =
        await knex('banners')
            .join('categories','banners.id','=','categories.id')
            .select('banners.id', 'banners.banner_image', 'banners.category_id', 'categories.id', 'categories.category_name')
    try {

        return { status: responseCode.SUCCESS, response: response }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
}

//   Get Intro Banner

export const getbanner = async () => {
    const response = await knex.select().from('banners')

    try {

        return { status: responseCode.SUCCESS, response: response }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
}

// service Api

export const getService = async () => {
    const response = await knex.select('*').from('services')

    try {

        return { status: responseCode.SUCCESS, response: response }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
}

// Get Catagory

export const getcategory = async (id) => {
    const response = await knex('categories').select('id', 'category_name', 'category_image', 'category_icon_image', 'category_color', 'description').where({ "id": id })
    // await knex.select('id','category_name','category_image','category_icon_image','category_color','description').from('categories')

    try {

        return { status: responseCode.SUCCESS, response: response }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
}

// Ger Cart Recommended List

export const recommendedList = async (id) => {

    const response = await knex.select('*').from('products').where({ 'id': id })

    try {

        return { status: responseCode.SUCCESS, response: response }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
}

// Get Time Slot

export const timeSlot = async (id) => {

    const response = await knex.select('*').from('timeslots').where({ 'id': id })

    try {

        return { status: responseCode.SUCCESS, response: response }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
}

export const PaymentMethod = async () => {
    const response = await knex.select().from('payment_methods')
    try {
    
      return { status: responseCode.SUCCESS, response: response }
     
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }
