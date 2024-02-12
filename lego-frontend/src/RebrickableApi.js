
const REBRICKABLE_URL = 'https://rebrickable.com/api/v3'

const REBRICKABLE_KEY = process.env.REBRICKABLE_KEY;
const USER_LEGO_TOKEN = process.env.MY_USER_TOKEN;

class RebrickableApi {

  static async fetchLegoSetByNum(setNum) {
    try {
      const response = await fetch(
        `${REBRICKABLE_URL}/lego/sets/${setNum}`,
        {
          headers: {
            Authorization: "key " + REBRICKABLE_KEY
          }
        }
      )
      return await response.json();

    } catch (err) {
      console.error(err);
    }
  };

  static async fetchLegoSetByName(searchName) {
    try {
      const response = await fetch(
        `${REBRICKABLE_URL}/lego/sets/?search=${searchName}`,
        {
          headers: {
            Authorization: "key " + REBRICKABLE_KEY
          }
        }
      )
      return await response.json();

    } catch (err) {
      console.error(err);
    }
  };

  static async fetchMyLists() {
    try {
      const response = await fetch(
        `${REBRICKABLE_URL}/users/${USER_LEGO_TOKEN}/setlists/`,
        {
          headers: {
            Authorization: "key " + REBRICKABLE_KEY
          }
        }
      )
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  };


  static async fetchMyListSets(list_id) {
    try {
      const response = await fetch(
        `${REBRICKABLE_URL}/users/${USER_LEGO_TOKEN}/setlists/${list_id}/sets/`,
        {
          headers: {
            Authorization: "key " + REBRICKABLE_KEY
          }
        }
      )
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  };


  static async searchSets(searchTerm) {
    return fetch(
      `${REBRICKABLE_URL}/sets/?ordering=ayear&search=${searchTerm}`,
      {
        headers: {
          Authorization: "key " + REBRICKABLE_KEY,
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((json) => json.results);
  };

  static async getAlternates(set_num) {
    try {
      const response = await fetch(
        `${REBRICKABLE_URL}/lego/sets/${set_num}/alternates`,
        {
          headers: {
            Authorization: "key " + REBRICKABLE_KEY,
            "Content-Type": "application/json"
          }
        }
      )
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  };


  static async addSetToList(setNum, list_id) {
    return fetch(
      `${REBRICKABLE_URL}/users/${USER_LEGO_TOKEN}/setlists/${list_id}/sets/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "key " + REBRICKABLE_KEY
        },
        body: JSON.stringify({ set_num: setNum })
      }
    ).then((response) => response.json());
  };

}

export default RebrickableApi;
