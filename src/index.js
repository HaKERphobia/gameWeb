import firebase, { database } from 'firebase';
import './mx.css';
import './index.css';
import {mxFirebase,initImgUpload, initModal} from './mx';
import riot from 'riot';



var firebaseConfig = {
  apiKey: "AIzaSyCE5-z3sdoC87l6Vcs-gWUTcm55a-Yw3Dw",
  authDomain: "web-game-review.firebaseapp.com",
  databaseURL: "https://web-game-review.firebaseio.com",
  projectId: "web-game-review",
  storageBucket: "web-game-review.appspot.com",
  messagingSenderId: "1077356894811",
  appId: "1:1077356894811:web:a84c2f91efa26503dbfd7e"
};
  // Initialize Firebase
  mxFirebase.init(firebaseConfig);

import './tags/homepage.tag';
import './tags/signin.tag';
import './tags/signup.tag';
import './tags/profile.tag';
import './tags/game.tag';
import './tags/taskbar.tag';
import './tags/post.tag';
import './tags/forum.tag';
import route from 'riot-route';

route.base("/")

async function getInfo(user) {
  let userChecker = await mxFirebase.collection('Userdata').getAll();
  for (let i = 0; i < userChecker.length; i ++) {
      if (userChecker[i].email == user) {
        return userChecker[i].userName;
      }
}
}

function mySearch() {
  var filter, web, a, i;
  filter = document.getElementById("mySearch").value.toUpperCase();
  // weblist = document.getElementById("weblist");
  web = document.getElementsByClassName("game_name");
  const img = document.getElementsByClassName("gameImg")
  for (i = 0; i < web.length; i++) {
    a = web[i];
      if(a.innerText.toUpperCase().indexOf(filter) > -1) {
        web[i].style.display = "";
        img[i].style.display = "";
        document.getElementsByClassName('rate')[i].style.display = "";
      } else {
        web[i].style.display = "none";
        img[i].style.display = "none";

      }
  }
}

function updateUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).child(userId).update({
    email: email,
    // password: password,
    userName: name,
  });
}

const taskbar = riot.mount("taskbar")
document.getElementById('mySearch').addEventListener('keyup', function (e) {
  mySearch()
  console.log("test")
})
document.getElementById("log_out").addEventListener("click",()=>{
  mxFirebase.auth().signOut()
  .then(function() {
    localStorage.setItem('email', null)
    window.location.href = "/home"
  })
  .catch(function(error) {
    console.log("Error")
  });
})
document.getElementById('img').addEventListener('click', function (e) {
  window.location.href = '/profile';
})
window.addEventListener('load', async function (e) {
let user = localStorage.getItem('email');
if (user != null) {
    let userChecker = await mxFirebase.collection('Userdata').getAll();
    for (let i = 0; i < userChecker.length; i ++) {
        if (userChecker[i].email == user) {
            document.getElementById("username").innerHTML = `Welcome,${userChecker[i].userName}`;
            if (userChecker[i].fileUrl.length != 0) {
              document.getElementById("img").src = `${userChecker[i].fileUrl}`;
            }
            else {
              document.getElementById("img").src = 'https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg'
            }
            // document.getElementById("email").innerHTML = userChecker[i].email;
            
          }
    }

}
else {
  document.getElementById("username").innerHTML = "No user";
  document.getElementById("img").src = 'https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg'

}
}) 


route("/home", () => {
const homePage = riot.mount("div#root", "homepage");



});

const checkAuth = () => {
  return new Promise((resolve, reject) => {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) resolve(user)
      else resolve(false);
    })  
  })

}

route("/signin", async (e) => {
const user = await checkAuth();
if (user) {
  alert("You've already had an account")
  window.location.href="/home"
}
else {
const signin = riot.mount("div#root", "signin"); 
document.getElementById("summitSI").addEventListener('click', async (e) => {
    e.preventDefault();
    let email = document.getElementById("emailSI").value;

    let password = document.getElementById("passwordSI").value;
    try {
        await mxFirebase.signIn(email,password);
        localStorage.setItem("email", email);
        let userChecker = await mxFirebase.collection('Userdata').getAll();
        for (let i = 0; i < userChecker.length; i ++) {
            if (userChecker[i].email == email) {
             localStorage.setItem("username",userChecker[i].userName);
            }
      }
        document.getElementById("Err_message").innerHTML = "Login sucessful !!!";
        window.location.href = '/home';
    } catch(err) {
        alert(err.message);
    }
    
})
}
})



route("/signup", async () => {
    const user = await checkAuth();
    if(user) {
      alert("You've already had an account")
      window.location.href="/home"
    } else {
    const signup = riot.mount("div#root", "signup"); 

    document.getElementById("create_account").addEventListener('click',async (e) =>{
      e.preventDefault();
      const email = document.getElementById("SUemail").value;
      const password = document.getElementById("SUpassword").value;
      const userName = document.getElementById("username").value;
      const c_pass = document.getElementById("c_pass").value;
      const files = [];
      document.querySelectorAll("input[type=file]").forEach(element => {
          if (element.files[0]) {
              files.push(element.files[0]);
          }
      });
      const fileUrl = await mxFirebase.putFiles(files);
      if (c_pass == password) {
        try{
            const res = await mxFirebase.signUp(email, password);
            const userData = await mxFirebase.collection("Userdata").saveWithId(res.user.uid ,{
              userName,
              email,
              password,
              fileUrl,
                  })
            // alert("Sucessful sign up")
            await mxFirebase.signIn(email,password);
            localStorage.setItem("email", email);
            localStorage.setItem("username",userName)
            window.location.href = "/home";
        }   catch(err) {   
          document.getElementById("err_message2").innerText = err.message;
        }
      }
      else {
        document.getElementById("err_message2").innerText = "Incorrect confirm password !!!";
      }
  
  
  })
  }
  })
  
  route("/profile", async () => {
    const profile = riot.mount("div#root", "profile");
    let user = localStorage.getItem('email');
if (user != null) {
    let userChecker = await mxFirebase.collection('Userdata').getAll();
    for (let i = 0; i < userChecker.length; i ++) {
        if (userChecker[i].email == user) {
          if (userChecker[i].fileUrl.length != 0) {
            document.getElementById("imgP").src = `${userChecker[i].fileUrl}`;
          }
          else {
            document.getElementById("imgP").src = 'https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg'
          }             
          document.getElementById("imgP").addEventListener('click',async function (e) {
            const files = [];
            document.querySelectorAll("input[type=file]").forEach(element => {
                if (element.files[0]) {
                    files.push(element.files[0]);
                }
            });
            const fileUrl = await mxFirebase.putFiles(files);
            if (fileUrl.length != 0) {
              document.getElementById("imgP").src = `${fileUrl[0]}`
            }
          })
          
          document.getElementById("usernameP").value = userChecker[i].userName;
            document.getElementById("emailP").innerHTML = userChecker[i].email;
            document.getElementById("update").addEventListener('click', async function (e) {
              let newUsername = document.getElementById("usernameP").value;
              const files = [];
              document.querySelectorAll("input[type=file]").forEach(element => {
                  if (element.files[0]) {
                      files.push(element.files[0]);
                  }
              });
              const fileUrl = await mxFirebase.putFiles(files);
              // let newEmail = document.getElementById("emailP").value;
              try {
                // updateUserData(userChecker[i]._id, newUsername,newEmail)
                const userData = await firebase.firestore().collection("Userdata").doc(`${userChecker[i]._id}`).update({
                  userName: newUsername,
                  fileUrl: fileUrl,
                })
                localStorage.setItem("username", newUsername)
                window.location.href = "/home";
              } catch (error) {
                document.getElementById('err_message').innerHTML = error.message;
              }
               
              
            })
            document.getElementById("cancel").addEventListener('click', function(e) {
              window.location.href = "/home";
            })
        }

    }



}
else {
    window.location.href = '/signin'
}



})


route("/post",async () => {
  const post = riot.mount("div#root", "post");
  const user = await checkAuth();
  if (!user) {
    alert("Please sign up or log in to your account !!!")
    window.location.href = "/signin"
  } else {
    document.getElementById("post").addEventListener('click' ,async function (e) {
      e.preventDefault;
      const name = document.getElementById("name").value;
      const author = localStorage.getItem('username');
      console.log(author)
      const files = [];
      document.querySelectorAll("input[type=file]").forEach(element => {
          if (element.files[0]) {
              files.push(element.files[0]);
          }
      });
      const release_date = new Date
      const type = []
      document.querySelectorAll('input[class=type]:checked').forEach(element => {
          type.push(element.value)
      });
      const discription = document.getElementById("discription").value
      const fileUrl = await mxFirebase.putFiles(files);
      const contact = document.getElementById("contact").value;
      const download_link = document.getElementById("dlink").value
      const rate = 0;
      const number_rate = 0;
      try {
      const gameInfo = await mxFirebase.collection("gameinfo").save({
        name,
        author,
        fileUrl,
        contact,
        download_link,
        release_date,
        type,
        discription,
        rate,
        number_rate,
            })
          window.location.href = "/home";
          } catch (err) {
            document.getElementById('err_message').innerHTML = err.message;
          }
    })

  }
})

// function rateSort (games) {
//   for (let i = 0; i < games.length - 1; i ++) {
//     if (games[i].rate <= games[i + 1].rate) {
//       games[i] = games[i + 1];
//       games[i + 1] = games[i];
//     }
//   }
//   return games;
// }

route("/game..", async () => {
  const user = await checkAuth();
  const filter = {};
  const query = route.query();
  console.log(query);
  if (decodeURIComponent(query.type) !== "All game") {
    filter.type = decodeURIComponent(query.type);
  }
  const pageNo = Number(query.page || 1)
  const page = await mxFirebase.collection("gameinfo").paginate(pageNo, 9, filter);
  const pageTotal = Math.floor(page.total / 9) + 1;
  page.data.sort(function(a,b){return a.rate - b.rate});
  page.data.reverse();
  const opts = {
    games: page.data,
    pageNo: pageNo,
    pageTotal: pageTotal,
  }
  const game = riot.mount("div#root", "game", opts);
  for (let i = 0; i < document.getElementsByClassName("rate_button").length; i ++) {
    if(user) {
    document.getElementsByClassName("rate_button")[i].addEventListener("click", async function (e) {
      let rates = document.getElementsByClassName("rate")[i].value;
      let newNumber_rate = page.data[i].number_rate + 1;
      let newRate = (page.data[i].rate * page.data[i].number_rate + Number(rates)) / newNumber_rate;
      const gameInfo = await firebase.firestore().collection("gameinfo").doc(page.data[i]._id).update({
        rate: newRate,
        number_rate: newNumber_rate,
      })
    })
    }
  }
  document.getElementById("pre_bt").addEventListener('click', function (e) {
    if (pageNo > 1) {
      window.location.href = `/game?page=${pageNo - 1}`
    } 
  })
  document.getElementById("next_bt").addEventListener('click', function(e) {
    if (pageNo < pageTotal) {
      window.location.href = `/game?page=${pageNo + 1}`
    }
  })
})



route ("/forum..", async () => {
  const query = route.query();
  const pageNo = Number(query.page || 1);
  const page = await mxFirebase.collection("comment").paginate(pageNo, 9);
  const pageTotal = Math.floor(page.total / 9) + 1;
  console.log(page.data)
  page.data.sort(function(a,b){return a.time.seconds - b.time.seconds})
  page.data.reverse();
  const opts = {
    comment: page.data,
    pageNo: pageNo,
    pageTotal: pageTotal,
  }
  console.log(document.getElementsByClassName("reply_btn"))

  const forum = riot.mount("div#root", "forum" ,opts);
  for (let i = 0; i < page.data.length; i ++) {
    document.getElementsByClassName("reply_btn")[i].addEventListener('click', function (e) {
      let title = document.getElementsByClassName("title2")[i].value;
      let content = document.getElementsByClassName("content2")[i].value;
      let userName = localStorage.getItem("username")
      let characterHTML = `<div>
        <div>${userName}</div>
        <div>${title}</div>
        <div>${content}</div>
      </div>`
      document.getElementsByClassName('reply_container')[i].insertAdjacentHTML("beforeend", characterHTML);
    })
  }
  document.getElementById('post').addEventListener('click',async function (e) {
    const user = await checkAuth();
    if (!user) {
      alert("Please sign up or log in to your account !!!")
    } else {
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username')
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const time = new Date();
    let userChecker = await mxFirebase.collection('Userdata').getAll();
    for (let i = 0; i < userChecker.length; i ++) {
        if (userChecker[i].email == email) {
          if (userChecker[i].fileUrl.length != 0) {
            let image = `${userChecker[i].fileUrl}`;
            try {
              const comment = await mxFirebase.collection("comment").save({
                email,
                title,
                content,
                time,
                username,
                image,
                    })
                  window.location.href = "/forum";
                  } catch (err) {
                    alert(err.message);
                  }
          }
          else {
            let image = 'https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg';
            try {
              const comment = await mxFirebase.collection("comment").save({
                email,
                title,
                content,
                time,
                username,
                image,
                    })
                  window.location.href = "/forum";
                  } catch (err) {
                    alert(err.message);
                  }
          }             
        }
        
    }
    }
  })
})



route.start(true)

