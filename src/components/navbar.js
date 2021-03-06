import layoutConstructor from '../core/layoutConstructor';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const location = history.location;

//NAV BAR COMPONENT
const navItems = [{
    path: '/dashboard',
    text: 'Dashboard',
    icon: 'camera'
  },
  {
    path: '/users',
    text: 'Users',
    icon: 'person'
  },
  {
    path: '/reports',
    text: 'Reports',
    icon: 'insert_chart'
  },
  {
    path: '/account',
    text: 'My Account',
    icon: 'settings'
  }
];

export default function NavBar(style) {
  const appContainer = document.getElementById('appContainer');
  const navContainer = document.createElement('div');
  if (style === 1){
    navContainer.className = 'navContainer';
  } else if (style === 2) {
    navContainer.className = 'nav2 navContainer';
  };
  navItems.forEach(function (item) {
    const navItem = document.createElement('div');
    navItem.className = 'navItem';
    navItem.innerHTML = '<i class="material-icons">'+item.icon+'</i><span class="navItemTool">'+item.text+'</span>';
    navContainer.appendChild(navItem);
    navItem.addEventListener('click', function () {
      history.push(item.path, {state: item.path});
      document.title = item.text + ' | ProgressHub';
      layoutConstructor.renderContent(item.path);
    });
    if (item.path == location.pathname){
      navItem.className = 'navItem active';
    }
    if (item.path == '/dashboard' && location.pathname == '/'){
      navItem.className = 'navItem active';
      document.title = item.text + ' | ProgressHub';
    }
    history.listen(function(location){
      if (item.path == location.pathname){
        navItem.className = 'navItem active';
        layoutConstructor.renderContent(item.path);
      }
      else {
        navItem.className = 'navItem';
      }
    });
    
  });
  appContainer.appendChild(navContainer);
}