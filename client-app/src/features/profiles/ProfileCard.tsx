import React from 'react';
import { Profile } from '../../app/models/profile';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {
  profile: Profile;
}

export default function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>Bio goes here</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
          20 followers
        </div>
      </Card.Content>
    </Card>
  );
}
