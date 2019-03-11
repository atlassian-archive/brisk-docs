// @flow

type FriendsInfo = {
  /* Name of the person who is asking for a new friend */
  me: string,
  /* Name of the person the asker wants to be friends with */
  you: string,
  /* a hobby to make it easier to start a conversation */

  hobby: string | void,
};

const BeFriends = ({ me, you, hobby }: FriendsInfo) => (
  <p>
    Hello {you}. My name is {me}. {hobby ? `I enjoy ${hobby}` : ''}. Would you
    like to be friends with me?
  </p>
);

export default BeFriends;
