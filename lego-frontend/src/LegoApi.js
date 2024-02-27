import axios from "axios";
import RebrickableApi from "./RebrickableApi"

const BASE_URL = 'http://localhost:3001';


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class LegoApi {
  // the token for interactive with the API will be stored here.
  static token;


  static async request(endpoint, paramsOrData = {}, method = "get") {
    console.debug("API Call:", endpoint, paramsOrData, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const headers = { Authorization: `Bearer ${LegoApi.token}` };

    try {
      return (
        await axios({
          url: `${BASE_URL}/${endpoint}`,
          method,
          [method === "get" ? "params" : "data"]: paramsOrData,
          headers
        })).data;

    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //----------------- USER ----------------

  /** Get token 
   * 
   * POST /auth/token:  { username, password } => { token }
  */

  static async login(data) {
    let res = await this.request('auth/token', data, "post");
    return res.token;
  }

  /** Register 
   * 
   * POST /auth/register:   { user } => { token }
   * user must include { username, password, firstName, lastName, email }
  */

  static async register(data) {
    let res = await this.request('auth/register', data, "post");
    return res.token;
  }

  /** Get details of the user w/username. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }


  /** Save user profile page.
   * 
   * PATCH /[username] { user } => { user }
   *  Data can include: { firstName, lastName, email, bio }
  */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }


  //----------------- LEGO SET ----------------

  /** Post a Lego Set by num. */

  static async createSet(data) {
    let res = await this.request('legosets/', data, "post");
    return res;
  }


  /** Get details on a Lego Set by num. */

  static async getLegoSet(num) {
    let res = await this.request(`legosets/${num}`);
    if (!res.legoSet) {
      res = await RebrickableApi.fetchLegoSetByNum(num);
    }
    return res;
  }

  /** Get all Lego Set by user_id. */
  static async getAllLegoSetsByUser(user_id) {
    let res = await this.request(`legosets/byuser/${user_id}`);

    let myListSetsNums = [];
    res.set.map(val => (myListSetsNums.push(val.lego_sets_num))
    )

    return myListSetsNums;
  }

  /** Get a Lego Set with nameLike. */

  static async getSearchLegoSet(nameLike) {
    let res = await this.request('legosets', { nameLike });

    if (res.set.length === 0) {
      let resApi = await RebrickableApi.fetchLegoSetByName(nameLike);
      res.set = resApi.results;
    }
    return res.set;
  }

  //----------------- LIST LEGO SET ----------------

  /** Create a List of Set */

  static async createListSet(name, user_id) {
    return await this.request('lists/', { name, user_id }, "post");
  }

  /** Get the List of Lego Set with the user_id. */

  static async getListByUser(user_id) {

    let res = await this.request(`lists/${user_id}`);
    return res;

  }

 /** Add a Lego Set to a list with the list_id and set_num. */

  static async addSetToList(list_id, sets_num) {

    let res = await this.getLegoSet(sets_num);
    const data = {
      set_num: res.set_num,
      name: res.name,
      year: res.year,
      theme_id: res.theme_id,
      num_parts: res.num_parts,
      set_img_url: res.set_img_url
    }

    await this.createSet(data);

    return await this.request(`lists/${list_id}/set/${sets_num}`, {}, "post");
  }

}

export default LegoApi;
