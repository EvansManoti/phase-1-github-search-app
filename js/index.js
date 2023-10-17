document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('github-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const searchTerm = document.getElementById('search').value;
      searchGitHubUsers(searchTerm);
    });
  });
  
  
  function searchGitHubUsers(searchTerm) {
    const apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayUserResults(data.items);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function displayUserResults(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; 
  
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="100">
        <h3>${user.login}</h3>
        <a href="${user.html_url}" target="_blank">View Profile</a>
      `;
      userList.appendChild(userItem);
  
      userItem.addEventListener('click', () => {
        getUserRepositories(user.login);
      });
    });
  }
  
  function getUserRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayUserRepositories(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function displayUserRepositories(repositories) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; 
  
    repositories.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      `;
      reposList.appendChild(repoItem);
    });
  }