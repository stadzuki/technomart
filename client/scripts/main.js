import {catalog} from './modules/createCatalog.js'
import {renderCatalog} from './modules/displayCatalog.js';
import sortCatalog from './modules/sortCatalog.js';
import {loadCart} from './modules/cart.js';
import actionsCatalog from './modules/actionsCatalog.js';
import {loadBookmark} from './modules/bookmarks.js';
import actionsHeader from './modules/actionsHeader.js';
import filterActions from './modules/filter.js'

renderCatalog(catalog);
sortCatalog();
actionsCatalog();
loadCart();
loadBookmark();
actionsHeader();
filterActions();
