import React from 'react';
import BlackBlock from '../BlackBlock/BlackBlock';
import ReactPlayer from 'react-player'


const MediaPlayer = (props) => {
    return ( 
        <BlackBlock width="75%" showClose={true} onClose={props.close}>
            <ReactPlayer url='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' controls/>
        </BlackBlock>
     );
}
 
export default MediaPlayer;