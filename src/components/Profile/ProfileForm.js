import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  const history = useHistory();

  const changePasswordHandler = async (event) => {
    event.preventDefault();

    const newPasswordEntered = newPasswordInputRef.current.value;

    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAc1ugzDUzx8ihNqpEMUBCLvifM4yvsK7Y",{
      method:"POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPasswordEntered,
        returnSecureToken: false,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    )

    const data = await response.json();

    if(data){
      history.replace("./");
    }
  }

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
