console.log('Time to finish !..');

const button = document.querySelector('button')!;

function clickHandler(message: string) {
    console.log('Clicked!! ' + message);
}

button.addEventListener('click', clickHandler.bind(null, 'Youre welcome'));
