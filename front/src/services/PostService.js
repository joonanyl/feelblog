import axios from 'axios'

const url = 'http://localhost:8081/'

const errorObj = { isSuccess: false, msg: "Something went wrong" };

export default {
    getAllPosts(){
        try{
            return axios.get(url + 'posts/').then(response => response.data);
        }catch(e){
            handleError(e);
        }
    },

    /**
     * Make search of posts by name in database.
     * Returning value is promise with object, which contains isSuccess boolean indicator of operation status on the server side and result array with all matches.
     * Operation status is true if query was successful, user is logged and no problems with Internet or database connection was occurred, if it is false the opposite.
     * @param title {string} full title or start of the post title
     * @returns Promise with object with operation status and result array or only operation status if right parameter was not provided
     */
    searchPostsByTitle(title){
        try{
            if(title){
                return axios.get(url + `posts?title=${title}`).then(response => response.data);
            } else{
                console.error("No title provided");
                return errorObj;
            }

        }catch(e){
            handleError(e);
        }
    },

    /**
     * Make search of posts by username value in database.
     * Returning value is promise with object, which contains isSuccess boolean indicator of operation status on the server side and result array with all matches.
     * Operation status is true if query was successful, user is logged and no problems with Internet or database connection was not occurred, if it is false the opposite.
     * @param author {string} full username or start of it
     * @returns Promise with object with operation status and result array or only operation status if right parameter was not provided
     */
    searchPostsByAuthor(author){
        try{
            if(author){
                return axios.get(url + `posts?author=${author}`).then(response => response.data);
            } else{
                console.error("No author provided");
                return errorObj;
            }

        }catch(e){
            handleError(e);
        }
    },

    /**
     * Make search of posts, which were created from, to and from to searching dates in database.
     * Returning value is promise with object, which contains isSuccess boolean indicator of operation status on the server side and result array with all matches.
     * Operation status is true if query was successful, user is logged and no problems with Internet or database connection was not occurred, if it is false the opposite.
     * @param start {date} starting date in format: 2021-03-01
     * @param end {date} ending date in format: 2021-03-01
     * @returns Promise with object with operation status and result array or only operation status if right parameter was not provided
     */
    searchPostsByDate(start, end){
        try{
            if(start || end){
                start = start ? start : "";
                end = end ? end : "";
                return axios.get(url + `posts?start=${start}&end=${end}`).then(response => response.data);
            } else{
                console.error("No dates provided");
                return errorObj;
            }
        }catch(e){
            handleError(e);
        }
    },

}

function handleError(e) {
    console.error("Something went wrong:");
    console.error(e);
    return errorObj;
}