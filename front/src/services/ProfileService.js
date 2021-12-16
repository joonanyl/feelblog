import axios from 'axios'

const url = 'http://localhost:8081/'

const errorObj = { isSuccess: false, msg: "Something went wrong" };

export default {
    /**
     * Create and save new post to the database and returns operation status.
     * Operation status isSuccess is true if query was successful, user is logged in and no problems with Internet or database connection was occurred, if it is false the opposite.
     * If right parameters was not provided operation status will be also false.
     * @param post {Object} content of the new post
     * @returns Promise with object with status of operation
     */
    createPost(post) {
        try{
            return axios.post(url + 'profile/myposts/', post).then(response => response.data);
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Read all user posts, returns it as object with results array and operation status isSuccess.
     * Operation status is true if query was successful, user is logged in and no problems with Internet or database connection was occurred, if it is false the opposite.
     * @returns Promise with object with operation status and result array or only operation status if right parameter was not provided
     */
    getAllPosts() {
        try{
            return axios.get(url + 'profile/myposts/').then(response => response.data);
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Read post with specific id, returns it as object with operation status isSuccess.
     * Operation status is true if query was successful, user is logged in and no problems with Internet or database connection was occurred, if it is false the opposite.
     * @param id {int} id number of the post
     * @returns Promise with object with operation status and result object or only operation status if right parameter was not provided
     */
    getPostById(id) {
        try{
            if(Number.isInteger(id)){
                return axios.get(url + `profile/myposts/${id}`).then(response => response.data);
            } else{
                console.error("id must be an integer");
                return errorObj;
            }
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Update post with specific id, returns object with operation status isSuccess.
     * Operation status is true if query was successful, user is logged in and no problems with Internet or database connection was occurred, if it is false the opposite.
     * @param id {int} id number of the post
     * @param post {Object} new content of the post
     * @returns Promise with object with status of operation
     */
    updatePostById(id, post) {
        try{
            if(Number.isInteger(id) && post){
                return axios.put(url + `profile/myposts/${id}/`, post).then(response => response.data);
            } else{
                console.error("id must be an integer and post can not be undefined");
                return errorObj;
            }
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Delete post with specific id, returns object with operation status isSuccess.
     * Operation status is true if query was successful, user is logged in and no problems with Internet or database connection was occurred, if it is false the opposite.
     * @param id {int} id number of the post
     * @returns Promise with object with status of operation
     */
    deletePostById(id) {
        try{
            if(Number.isInteger(id)){
                return axios.delete(url + `profile/myposts/${id}`).then(response => response.data);
            } else {
                console.error("id must be an integer");
                return errorObj;
            }
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Read all user personal information, as name, email, phone etc. and return it as object with corresponding keys as name, email etc.
     * @returns Promise with result object, containing all user personal information, in case of error will return empty object
     */
    getAllData() {
        try{
            return axios.get(url + `profile/information/`).then(response => response.data);
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Read specific user personal information only such as name, email, phone etc. and return it as object with corresponding key as name, email etc.
     * Also returned object will contain operation status isSuccess, which is true if query was successful, user is logged in and no problems with Internet or database connection was occurred, if it is false the opposite.
     * @param name {string} name of the user information (in sql table), for example email
     * @returns Promise with object with operation status and result array or only operation status if right parameter was not provided
     */
    getPropertyByName(name) {
        try{
            if(name){
                return axios.get(url + `profile/information/${name}`).then(response => response.data);
            } else {
                console.error("property name is not provided");
                return errorObj;
            }
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Update specific user personal information only such as name, email, phone etc. and return it as object with corresponding key as name, email etc.
     * Also returned object will contain operation status isSuccess, which is true if query was successful, user is logged in and no problems with Internet or database connection was occurred, if it is false the opposite.
     * @param name {string} name of the user information (in sql table), for example email
     * @param newValue {string} new value
     * @returns Promise with object with operation status and result array or only operation status if right parameter was not provided
     */
    updatePropertyByName(name, newValue) {
        try{
            if(name && newValue){
                return axios.put(url + `profile/information/${name}`, {value: newValue}).then(response => response.data);
            } else {
                console.error("property name or new value are not provided");
                return errorObj;
            }
        }catch(e){
            handleError(e);
        }
    }
}

function handleError(e) {
    console.error("Something went wrong:");
    console.error(e);
    return errorObj;
}