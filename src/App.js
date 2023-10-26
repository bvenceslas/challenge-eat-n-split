import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriends={setFriends} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList({ friends }) {
  const friendList = friends;
  return (
    <ul className="">
      {friendList.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li className="">
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ friends, onAddFriends }) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  function handleClearForm() {
    setName("");
    setImageURL("");
  }

  function handleAddFriends(e) {
    e.preventDefault();

    const newFriend = {
      id: Date.now().toLocaleString(),
      name,
      imageURL,
      balance: 0,
    };

    // add a friend
    onAddFriends((friends) => [...friends, newFriend]);
    // clear add friend form
    handleClearForm();
  }

  return (
    <form className="form-add-friend">
      <label>👬 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />

      <Button onClick={handleAddFriends}>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split Bill with X</h2>

      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🧑🏽‍🦲 Your expense</label>
      <input type="text" />

      <label>👬 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}
