import React, { 
    useState,
    useEffect,
    useContext
  } from "react";
  
  import styled from "styled-components";
  
  import { 
    colors,
  } from 'common';

  import { DeviceMediaQueries } from "common/device";
  
//   import {
//     Routes
//   } from 'navigation';

  
//   import { 
//     useHistory 
//   } from "react-router-dom";
  
  import { 
    NavOption 
  } from "./components/NavOption";
  
  import { 
    ActiveViewContext
  } from "contexts/ActiveViewContext";
  
//   import { DataStore } from "common/dataStore";

import {
	IoFastFood,
	IoCalendar,
	IoSearch,
	IoPersonCircle,
	IoChatbubble,
	IoLogOut,
	IoSettingsSharp,
	IoLogIn,
	IoHomeSharp,
	IoToday,
	IoPersonSharp,
} from "react-icons/io5";
  
  const NavContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 4rem;
    z-index: 900;
    background-color: ${colors.secondary};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media ${DeviceMediaQueries.laptop} {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        width:100px;
        min-width: 60px;
        max-width: 80px;
        min-height: 100%;
        z-index: 99; 
    };
`
  
const NavOptions = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;


    @media ${DeviceMediaQueries.laptop} {
        flex-direction: column;
        height: 25%;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;

    }
  `
  
  const Settings = styled.div`
        display: none;
        @media ${DeviceMediaQueries.laptop} {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 1rem;
        }
  `
  
  
  export const Nav = () => {
  
    const [menuActive, setMenuActive] = useState(false)
    const [mealsActive, setMealsActive] = useState(false)
    const [profileActive, setProfileActive] = useState(false)
    const [settingsActive, setSettingsActive] = useState(false)
  
    const activeContext = useContext(ActiveViewContext);
    const active = activeContext.state.active;  
  
    // const history = useHistory();
  
    const [error, setError] = useState("");
  
    async function handleLogout() {
      setError("");
      try {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        await fetch('https://munchies-api-5fqmkwna4q-nw.a.run.app/logout', {
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          withCredentials: true,
          credentials: 'include',
          headers: headers,
        });
        
        await DataStore.clear("MUNCHIES_USER");
  
      } catch (err) {
        setError("Failed to log out", err);
      }
  
    //   history.push(Routes.login.path);
    };
  
  
    useEffect(() => {        
      if(active === "MENUS") {
          setMenuActive(true)
      } else {
          setMenuActive(false)
      }
      if(active === "MEALS") {
          setMealsActive(true)
      } else {
          setMealsActive(false)
      }
      if(active === "PROFILE") {
          setProfileActive(true)
      } else {
          setProfileActive(false)
      }
  
    }, [active])
  
  
    return (
  
      <NavContainer > 
  
        <NavOptions>
  
          <NavOption 
              title={"My Menus"}
              Icon={IoCalendar} 
              path={"/menus"} 
              active={menuActive}
          />
  
          <NavOption
              title={"My Meals"} 
              Icon={IoFastFood} 
              path={"/meals"}
              active={mealsActive}
          />
  
          <NavOption 
            title={"Settings"}
              Icon={IoSettingsSharp} 
              path={"/settings"}
              active={profileActive}
          />
  
        </NavOptions>
  
        <Settings>
            <div 
                onClick={handleLogout}
                style={{width: '100%', }}
            >
            <NavOption 
                title="Logout" 
                Icon={IoLogOut}
                onClick={handleLogout}
                />
            </div>
        </Settings>

      </NavContainer>
    );
  }
  
  
  