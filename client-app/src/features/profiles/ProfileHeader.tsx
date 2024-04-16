import React from 'react';

import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  RevealContent,
  Segment,
  Statistic,
  StatisticGroup,
} from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.image || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1' content={profile.displayName}></Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <StatisticGroup widths={2}>
            <Statistic label='Followers' value='5' />
            <Statistic label='Following' value='42' />
          </StatisticGroup>
          <Divider />
          <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
              <Button fluid color='teal' content='Following' />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: '100%' }}>
              <Button
                fluid
                basic
                // eslint-disable-next-line no-constant-condition
                color={true ? 'teal' : 'green'}
                // eslint-disable-next-line no-constant-condition
                content={true ? 'Unfollow' : 'Follow'}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
