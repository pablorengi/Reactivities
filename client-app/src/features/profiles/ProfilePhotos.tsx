import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Image, TabPane } from 'semantic-ui-react';
import { Photo, Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => {
      setAddPhotoMode(false);
    });
  }

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <TabPane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                        basic
                        color='teal'
                        disabled={photo.isMain}
                        loading={target === 'main' + photo.id && loading}
                        name={'main' + photo.id}
                        content='Main'
                      />
                      <Button
                        onClick={(e) => handleDeletePhoto(photo, e)}
                        loading={loading && target === photo.id}
                        disabled={photo.isMain}
                        name={photo.id}
                        basic
                        color='red'
                        icon='trash'
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </TabPane>
  );
});
