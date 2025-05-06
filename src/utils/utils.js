import { ref } from "vue";
import axios from "axios";
import Cookies from "universal-cookie";


const cookie = ref(new Cookies());
const API = ref(null);

export function INIT() {
    async function InitAPI(){
        if (API.value == null) {
            const APIGA = await fetch('https://9z2babe43m.execute-api.eu-north-1.amazonaws.com/prod/getTheUrl');
            API.value = axios.create({
                withCredentials: true,
                baseURL: `https://${await APIGA.json()}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
            if (await cookie.value.get('csrftoken') == undefined) {
                console.log('lolll');
                await API.value.get('/csrf');
            }
            API.value.defaults.headers.post['X-CSRFToken'] = await cookie.value.get('csrftoken')
            console.log(API.value.defaults);
    }
    return {
        API,
        InitAPI,
        cookie,
    }
}
