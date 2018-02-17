import React, { Component } from 'react';
import './App.css';
import MessageList from './MessageList';
import Toolbar from './Toolbar';
import axios from 'axios';
import ComposeForm from './ComposeForm'

class App extends Component {

  state = {
    messages: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ],
    showCompose: false
  }

  // GET REQUEST FOR MESSAGES :
  componentDidMount = async () => {
    let messages = await axios.get(`http://localhost:3002/messages`)
    this.setState({messages: messages.data})
  }

  // POST REQUEST FOR NEW MESSAGES :
  addMessage = async(message) => {
    let newMessage = {
      ...message,
      labels: JSON.stringify([]),
      read: false,
      selected: false,
      starred: false
    }
    let newMessages = await axios.post(`http://localhost:3002/messages`, newMessage)
    this.setState({messages: newMessages.data})
  }

  // TOGGLES THE COMPOSE FORM SECTION :
  toggleComposeForm = () => {
    this.setState({showCompose: !this.state.showCompose})
  }

  // TOGGLES READ/UNREAD :
  toggleRead = (selectedMessage) => {
    let otherMessages = this.state.messages.filter(message => selectedMessage.id != message.id)
    console.log('other messages', otherMessages);
    let changedMessage = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: !selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels
    }
    this.setState({messages: otherMessages.concat(changedMessage).sort((a, b) => a.id - b.id)})
  }

  // TOGGLES STARRED/UNSTARRED :
  toggleStarred = (selectedMessage) => {
    let otherMessages = this.state.messages.filter(message => selectedMessage.id != message.id)
    console.log('other messages', otherMessages);
    let changedMessage = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: !selectedMessage.starred,
      labels: selectedMessage.labels
    }
    this.setState({messages: otherMessages.concat(changedMessage).sort((a, b) => a.id - b.id)})
  }

  // TOGGLES SELECTED/UNSELECTED :
  toggleSelected = (selectedMessage) => {
    let otherMessages = this.state.messages.filter(message => selectedMessage.id != message.id)
    console.log('other messages', otherMessages);
    let changedMessage = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels,
      selected: !selectedMessage.selected || false
    }
    this.setState({messages: otherMessages.concat(changedMessage).sort((a, b) => a.id - b.id)})
  }

  // CREATES SHALLOW COPY OF STATE :
  toolbarCopyCurrentState = () => {
    return this.state.messages.map((message) => {
      return {...message};
    });
  }

  // CALLS TOOLBARCOPYCURRENTSTATE FUNC ON BUTTON PRESS :
  selectButtonFunc = (type) => {
    let messagesStateCopy = this.toolbarCopyCurrentState();

    if (type.includes('check')) {
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = false;
        return message
      });
    } else {
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = true;
        return message
      });
    }
    this.setState({messages: messagesStateCopy});
  }

  // SETS STATE OF UNREAD MESSAGES :
  setUnreadFunc = () => {
    let newState = this.state.messages.map(msg => {
      if(msg.selected) msg.read = false;
      return msg;
    })

    this.setState({messages: newState});
  }

  // SETS STATE OF READ MESSAGES :
  setReadFunc = () => {
    let newState = this.state.messages.map(msg => {
      if(msg.selected) msg.read = true;
      return msg;
    })

    this.setState({messages: newState});
  }

  // DELETE MESSAGE FUNC :
  deleteMessages = () => {
    let newState = this.state.messages.filter(msg => !msg.selected);
    this.setState({messages: newState});
  }

  // ADD LABEL FUNC :
  addLabel = (label) => {
    let newState = this.state.messages.map(msg => {
      if(msg.selected && !msg.labels.includes(label)) msg.labels.push(label)
      return msg;
    })
    this.setState({messages: newState});
  }

  // REMOVE LABEL FUNC :
  removeLabel = (label) => {
    let newState = this.state.messages.map(msg => {
      if (msg.selected) msg.labels = msg.labels.filter(l => l !== label)
      return msg;
    })
    this.setState({messages: newState});
  }

  render() {
    let numOfSelectedMsgs = this.state.messages.filter(msg => msg.selected).length;
    console.log('num of selected', numOfSelectedMsgs);
    return (
      <div className="App">
        <Toolbar
          numOfSelectedMsgs={numOfSelectedMsgs}
          messages={this.state.messages}
          selectButtonFunc={this.selectButtonFunc}
          setUnreadFunc={this.setUnreadFunc}
          setReadFunc={this.setReadFunc}
          deleteMessages={this.deleteMessages}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          toggleComposeForm={this.toggleComposeForm}
          showCompose={this.state.showCompose}
        />
        {this.state.showCompose && <ComposeForm addMessage={this.addMessage} />}
        <MessageList
           messages={this.state.messages}
           toggleRead={this.toggleRead}
           toggleStarred={this.toggleStarred}
           toggleSelected={this.toggleSelected}
         />
      </div>
    );
  }
}

export default App;
