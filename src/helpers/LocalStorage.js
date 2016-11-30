const LOCAL_STORAGE_CART_KEY = 'cart';

/**
 * Helper to load and save cart from localStorage
 *
 */
export default class LocalStorageManager {

  /**
   * Load cart from localStorage
   *
   * @param store
   */
  static loadCartIfPresent() {
    if (window.localStorage.getItem(LOCAL_STORAGE_CART_KEY)){
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));
    }
    return {purchase: {}, offers: [], isFetch: false, isFetching: false};
  }

  /**
   * Save cart in localStorage
   *
   * @param cart
   */
  static saveCart(cart){
    window.localStorage.setItem(LOCAL_STORAGE_CART_KEY,JSON.stringify(cart));
  }


  static getString(){
    return 'toto';
  }
}