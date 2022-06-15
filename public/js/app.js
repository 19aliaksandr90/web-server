console.log('Client side javascript file is loaded');
fetch('http://puzzle.meadmio/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

fetch('');
