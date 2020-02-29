import React from 'react';
import ReactDOM from 'react-dom';
import AddQuest from "../Containers/AddQuest.js"
import '../Components/AddAss.css';
import axios from 'axios';
import { apiBaseUrl } from '../Components/config.js';


class AddAss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: this.props.login, 
                      teacher: this.props.teacher, 
                      password: this.props.password, 
                      tid: 0, 
                      title: "", 
                      due_date:"", 
                      mul_que: 0, 
                      uid: 0};     
    }

    componentDidMount() {
        if (this.state.teacher === true) {
            var body=document.getElementById("buttonsBody");
            body.removeAttribute("hidden");
        }
        const users=[];
        //get users
        //setStae uid

    }

    componentDidUpdate(prevProps){
        if (this.props.teacher !== prevProps.teacher) {
            this.setState({teacher: this.props.teacher});
        }
        
        if (this.state.teacher === true) {
            var body=document.getElementById("buttonsBody");
            body.removeAttribute("hidden");
        }
        
    }

    openAddQuest = async () => {
        //CREATING A JSON OBJECT WITH INFO ABOUT NEW ASSIGNMENT
        // Add user id
        var test = {
            //"teacher_id":this.state.username,
            "title": this.state.title,
            "due_date": new Date(this.state.due_date).toJSON(),
            "multipe_choice": this.state.mul_que,

        }
        var self= this;
        //ADDING NEW ASSIGNMENT TO DATABASE
        let response = await axios.post(apiBaseUrl+'/assignment', test);
        this.setState({tid: response.data.id});

        var mul_quest=[];
        for (var i=0; i<this.state.mul_que; i++){
            mul_quest.push(i+1);
        }
        const add_quest = <AddQuest login={this.state.login} password={this.state.password} teacher={this.state.teacher} mul={this.state.mul_que} mul_quest={mul_quest} tid={this.state.tid} uid={this.state.uid}/>;
        ReactDOM.render(add_quest, document.getElementById('root'));
    }

    changeQuan = (e) => {
        e.preventDefault();
        this.setState({mul_que: e.target.value});
    } 

    changeTitle = (e) => {
        e.preventDefault();
        this.setState({title: e.target.value});
    } 
    
    changeDate = (e) => {
        e.preventDefault();
        this.setState({due_date: e.target.value});
    } 

    render(){
        return(
            <div hidden id="buttonsBody">
            <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>

                <div>
                    <h1 className="addAssTitle">Add New Assignment</h1>
                    <input id='assTitle' type="text" placeholder="Type here the title of the assignment" onChange={this.changeTitle} required/><br/>
                    <label className="assLabel" htmlFor="mul_que">Choose the number of multiple choice questions: </label>
                    <input className="assNum" type="number" id="mul_que" name="mul_que" min="0" max="20" onChange={this.changeQuan}/><br />
                    <label className="assLabel" htmlFor="due_date">Choose the due date: </label>
                    <input className="assDate" type='date' id="due_date" onChange={this.changeDate}/><br/>
                    <input className="assBtn" type="submit" value="Add Assignment" onClick={this.openAddQuest.bind(this)}/>
                </div>
            </div>
        )
    }
}


export default AddAss;