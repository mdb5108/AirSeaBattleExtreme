
function AudioManager(introMusic)
{
    this.musicPath = introMusic; 
    this.introMusic = new Audio(this.musicPath);
    this.introMusic.loop = true;
    this.introMusic.play();    
};

function PlaySound(soundPath)
{
    var soundObj = new Audio(soundPath);
    soundObj.play();
    return soundObj;
}


