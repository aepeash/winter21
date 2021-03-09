import React from "react";
import Firebase from "firebase";
import config from "./config";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export class AddMentors extends React.Component {
    constructor(props) {
        super(props);
        // Firebase.initializeApp(config.firebase);
        if (!Firebase.apps.length) {
            Firebase.initializeApp(config);
        }else {
            Firebase.app(); // if already initialized, use that one
        }
        this.usersRef = Firebase.firestore().collection('mentors');
        this.mentors = []
        this.state = {
            developers: []
        };

    }

    componentDidMount() {
        console.log("umm tf is this called?", this.mentors);

        this.getUserData();
        console.log("umm tf is this called?", this.mentors);
    }

    // componentDidUpdate(prevProps, prevState) {
    //   if (prevState !== this.state) {
    //     this.getUserData();
    //   }
    // }

    writeUserData = async (displayName, email, password) => {
        let newUser = {
            displayName: displayName,
            email: email,
            password: password
        }
        let newUserDocRef = await this.usersRef.add(newUser);
        // this.usersRef
        //   .add(this.state);
        let key = newUserDocRef.id;
        newUser.key = key;
        this.mentors.push(newUser);
        this.setState({developers: newUser});
        console.log(newUserDocRef);
    };

    getUserData = async () => {
        // let ref = this.usersRef.get();
        let querySnap = await this.usersRef.get();
        querySnap.forEach(qDocSnap => {
            let key = qDocSnap.id;
            let data = qDocSnap.data();
            data.key = key;
            this.mentors.push(data);
            this.setState({developers: data});
        })
        console.log("getuser data", this.mentors);

        // ref.on("value", snapshot => {
        //   const state = snapshot.val();
        //   this.setState(state);
        // });
    };

    handleSubmit = event => {
        event.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let displayName = this.refs.displayName.value;

        this.writeUserData(displayName, email, password);
        console.log("submitted", displayName, email, password);
    }

    removeData = developer => {
        const { developers } = this.state;
        const newState = developers.filter(data => {
            return data.displayName !== developer.displayName;
        });
        this.setState({ developers: newState });
    };

    updateData = developer => {
        this.refs.displayName.value = developer.displayName;
        this.refs.email.value = developer.email;
        this.refs.password.value = developer.password;
    };

    render() {
        const { developers } = this.state;
        console.log("hello render", developers);
        return (

            <React.Fragment>

                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <h1>Create a mentor</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            {this.mentors.map(developer => (
                                <>
                                    <div
                                        //key not needed with react.fragment
                                        key={developer.displayName}
                                        className="card float-left"
                                        style={{ width: "18rem", marginRight: "1rem" }}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title" >Name: {developer.displayName}</h5>
                                            <h5 className="card-title">Email: {developer.email}</h5>
                                            {/*<p className="card-text">{developer.password}</p>*/}
                                            {/* <button
                                                onClick={() => this.removeData(developer)}
                                                className="btn btn-link"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => this.updateData(developer)}
                                                className="btn btn-link"
                                            >
                                                Edit
                                            </button>*/}
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <h1>Add new mentor here</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            ref="displayName"
                                            className="form-control"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            ref="email"
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input
                                            type="text"
                                            ref="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


//export default App;