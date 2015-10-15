Music.prototype = Object.create(GameObject.prototype);

function Music(trackIndex)
{
    GameObject.call(this, "", 0, 0, 0, 0);
    this.trackIndex = trackIndex;
    this.sound_paths = ["audio/Air-Sea Intro!.mp3","audio/Obliteration.mp3"];    
    this.sound_path = this.sound_paths[trackIndex];
    this.sound_loop = true;
};

Music.prototype.Draw = function(canvas2D)
{

    if(this.sound_path != "no_sound")
        this.PlaySound();
    this.sound_path = "no_sound";

};

Music.prototype.Update = function(gametime)
{
    //Overriden to be empty
};
