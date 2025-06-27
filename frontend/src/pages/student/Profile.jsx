import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Course from './Course';
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';

const Profile = () => {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const { data, isLoading: isLoadingProfile, isError: isProfileError } = useLoadUserQuery();
  const [updateUser, { isLoading: isUpdating, isError, error, isSuccess }] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('profilePhoto', profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated.");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }, [isSuccess, isError, error]);

  if (isLoadingProfile) return <h1>Profile Loading...</h1>;
  if (isProfileError || !data?.user) return <h1>Unable to load user profile.</h1>;

  const { user } = data;

  return (
    <div className='my-24 max-w-4xl mx-auto px-4'>
      <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
      <div className='flex flex-col md:flex-row item-center md:item-start gap-35 my-5'>
        <div className='flex flex-col item-center h-8 w-8'>
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src={user.photoUrl} className="rounded-full" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
              Name:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.name}</span>
            </h1>
          </div>
          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
              Email:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.email}</span>
            </h1>
          </div>
          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
              Role:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.role.toUpperCase()}</span>
            </h1>
          </div>

          <Dialog>
            <DialogTrigger>
              <Button size='sm' className='mt-2'>Edit profile</Button>
            </DialogTrigger>
            <DialogContent className='bg-gray-100'>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make Changes In Your Profile Here.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Name</Label>
                  <Input
                    type='text'
                    placeholder='Name'
                    className='col-span-3'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Profile Photo</Label>
                  <Input
                    type='file'
                    accept='image/*'
                    className='col-span-3'
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button disabled={isUpdating} onClick={updateUserHandler}>
                  {
                    isUpdating ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                      </>
                    ) : (
                      'Save Changes'
                    )
                  }
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <h1 className='font-medium text-lg'>Courses You Are Enrolled In</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-5'>
          {
            user.enrolledCourses.length === 0
              ? <h1>You haven't enrolled in any course yet</h1>
              : user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
