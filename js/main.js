$(document).ready(function(){
$('#searchusers').on('keyup',function(e){
var users=e.target.value;
var myid=config.id;
var mysecret=config.secret;
$.ajax({
  url:'https://api.github.com/users/'+users,
  data:{
    client_id:myid,
    client_secret:mysecret,
  }

}).done(function(user){
  console.log(user[0]);
    if(user.name===null)
    user.name="Not specified";
    if(user.bio===null)
    user.bio="Not specified";
    if(user.company===null)
    user.company="Not specified";
    if(user.location===null)
    user.location="Not specified";


  $.ajax({
    url:'https://api.github.com/users/'+users+'/repos',
    data:{
      client_id:myid,
      client_secret:mysecret,
    }

  }).done(function(repos){
    for(x=0;x<repos.length;x++){
      $('#repos').append(`
        <div class="well">
        <div class="row">
        <div class="col-sm-7">
        ${repos[x].name}
        </div>
        <div class="col-sm-3">
        <span class="label label-default">Forks: ${repos[x].forks_count}</span></>
        <span class="label label-primary">Watchers: ${repos[x].watchers_count}</span>
        <span class="label label-success">Stars: ${repos[x].stargazers_count}</span>
        </div>
        <div class="col-sm-2">
        <a class="btn btn-primary" href="${repos[x].html_url}" target="_blank">Repo Page</a>
        </div>
        </div>
        </div>

        `);

    }

  });
$('#profiles').html(`
  <div class="panel panel-default">
      <div class="panel-heading"><b>Name: ${user.name}</b></div>
      <div class="panel-body">
        <div class="row">
        <div class="col-md-3 col-sm-3">
        <img style="width:100%" class="thumbnail" src="${user.avatar_url}">
        <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
        </div>
        <div class="col-md-9 col-sm-9">
        <span class="label label-default">Public Repos: ${user.public_repos}</span>
        <span class="label label-primary">Public Gists: ${user.public_gists}</span>
        <span class="label label-success">Followers: ${user.followers}</span>
        <span class="label label-info">Following: ${user.following}</span><br><br>
        <ul class="list-group">
          <li class="list-group-item">Bio: ${user.bio}</li>
          <li class="list-group-item">Company: ${user.company}</li>
          <li class="list-group-item">Location: ${user.location}</li>
        </ul>
        </div>

      </div>
      <h1>All Repos</h1>
      <div id="repos"></div>
    </div>
  `);
});
});

});
