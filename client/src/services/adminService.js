import axios from "axios";
import { API_URL } from '../config'
import { toFormData } from '../utils/converAndCheck'
import { getRequestConfig, getFormDataRequestConfig } from './index'

async function getData(cb) {
    try {
        const query = await axios.get(`${API_URL}/admin`, getRequestConfig());
        const { data } = query
        if (cb) {
            cb(data);
        }
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function getUsers(role, cb) {
    try {
        const query = await axios.get(`${API_URL}/admin/users/${role}`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}


// Properties
async function getProperties(cb) {
    try {
        const query = await axios.get(`${API_URL}/admin/properties`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function deletePropertie(id, cb) {
    try {
        const query = await axios.delete(`${API_URL}/admin/propertie/${id}`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function addPropertie(form, cb) {

    try {
        const query = await axios.post(`${API_URL}/admin/propertie`, toFormData(form), getFormDataRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function updatePropertie(id, form, cb) {
    try {
        const query = await axios.put(`${API_URL}/admin/propertie/${id}`, form, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function swapPosition(form, cb) {
    try {
        const query = await axios.put(`${API_URL}/admin/properties/swapPosition`, form, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

// Partners
async function getPartners(cb) {
    try {
        const query = await axios.get(`${API_URL}/admin/partners`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function deletePartner(id, cb) {
    try {
        const query = await axios.delete(`${API_URL}/admin/partner/${id}`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function addPartner(form, cb) {

    try {
        const query = await axios.post(`${API_URL}/admin/partner`, toFormData(form), getFormDataRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function updatePartner(id, form, cb) {
    try {
        const query = await axios.put(`${API_URL}/admin/partner/${id}`, form, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function swapParnersPosition(form, cb) {
    try {
        const query = await axios.put(`${API_URL}/admin/partners/swapPosition`, form, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function getZones(cb) {
    try {
        const query = await axios.get(`${API_URL}/admin/agency-zone`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function addZone(form, cb) {

    try {
        const query = await axios.post(`${API_URL}/admin/agency-zone`, form, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function addAgency(form, cb) {

    try {
        const query = await axios.post(`${API_URL}/admin/agency`, form, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function deleteZone(id, cb) {
    try {
        const query = await axios.delete(`${API_URL}/admin/agency-zone/${id}`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

async function deleteAgency(id, cb) {
    try {
        const query = await axios.delete(`${API_URL}/admin/agency/${id}`, getRequestConfig());
        const { data } = query

        return cb ? cb(data) : data
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

export {
    getData,

    // Properties
    getProperties,
    deletePropertie,
    updatePropertie,
    getUsers,
    addPropertie,
    swapPosition,

    // Partners
    getPartners,
    deletePartner,
    addPartner,
    updatePartner,
    swapParnersPosition,

    // Partners
    getZones,
    addZone,
    addAgency,
    deleteAgency,
    deleteZone
};