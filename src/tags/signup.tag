<signup>
    <!-- <h1>Start build this up</h1>

<label for="">Username:</label>
<input type="text" placeholder="Username" id="username" required>

<label for="">Email:</label>
<input type="email" placeholder="Email" id="SUemail" required>

<label for="">Password:</label>
<input type="password" placeholder="Password" id="SUpassword" required>

<label for="">Confirm password</label>
<input type="password" placeholder="confirm password" id="c_pass" required>
placeholder="confirm password"

<label for="">Profile image:</label>
<input type="file" id="st_img">

<button id="create_account">Create account</button>

<p id="err_message2"></p> -->

    <div id="container-signIn">

        <div class="container">
            <div class="login-form">
                <p>Sign Up</p>
            </div>

            <div class="container-input">
                <div class="input">
                    <input
                        style="width: 100%; height: 100% ; border: solid 1px #4a3a2d45; border-radius: 20px; padding-left: 10px; outline: 0; height: 50px; width: 250px"
                        placeholder="Username" type="email" id="username"></input>
                </div>
                <div class="input">
                    <input
                        style="width: 100%; height: 100%; border: solid 1px #4a3a2d45; border-radius: 20px; padding-left: 10px; margin: 8px 20% 0 0; outline: 0; height: 50px; width: 250px"
                        placeholder="Password"                       type=" password" id="SUpassword"></input>
                </div>
                <div class="input">
                    <input
                        style="width: 100%; height: 100%; border: solid 1px #4a3a2d45; border-radius: 20px; padding-left: 10px; margin: 8px 20% 0 0; outline: 0; height: 50px; width: 250px"
                        placeholder="confirm password"
                            type=" password" id="c_pass"></input>
                </div>
                <div class="input">
                        <input
                            style="width: 100%; height: 100%; border: solid 1px #4a3a2d45; border-radius: 20px; padding-left: 10px; margin: 8px 20% 0 0; outline: 0; text-align: center;"
                            placeholder="Profile image"
                            type="file" id="st_img"></input>
                    </div>
            </div>


            <div class=" container-signUp">
                <button class="btn" style="width:80%; height: 50px; border-radius: 100px; color: white"
                    id="create_account">Create account</button>
                <p style="margin: 0 25%">
                    Already a member?
                    <a href="/signin">
                        <span>Sign in now!</span>
                    </a>
                </p>
            </div>
        </div>
    </div>
</signup>