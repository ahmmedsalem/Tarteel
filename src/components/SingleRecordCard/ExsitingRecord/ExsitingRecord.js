import SingleRecordCard from "../SingleRecordCard"

const ExsitingRecord = (props) => {
    return (
        <SingleRecordCard>
            <img className="single-record-card-img" src={props.img} alt=""></img>
            <div className="single-record-card-name">
                <span>{props.name}</span>
                {props.btn &&
                    <button className="listen-btn">استماع</button>}
            </div>
            {/* <button className="play-pause-btn"></button> */}
        </SingleRecordCard>
    )
}

export default ExsitingRecord;