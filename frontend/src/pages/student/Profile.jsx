import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'


const Profile = () => {

  //const isLoading = true;

  // const enrolledCourses = [
  //   1, 2
  // ]
  
  const {data, isLoading} = useLoadUserQuery();  //{} these braces are used for GET request in RTK
  const [updateUser] = useUpdateUserMutation(); //[] these braces are used for POST/PUT req in RTK
  console.log(data);
  
  if(isLoading) return <h1>Profile Loading...</h1>
  
  const {user} = data;

  return (
    <div className='my-24 max-w-4xl mx-auto px-4'>
      <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
      <div className='flex flex-col md:flex-row item-center md:item-start gap-35 my-5'>
        <div className='flex flex-col item-center h-8 w-8'>
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user.photoUrl}
              className="rounded-full"
            />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
              Name:-
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.name}</span>
            </h1>
          </div>

          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
              Email:-
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.email}</span>
            </h1>
          </div>

          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
              Role:-
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
                  <Input type='text'
                    placeholder='Name'
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Profile Photo</Label>
                  <Input type='file'
                    accept='image/*'
                    className='col-span-3'
                  />
                </div>
              </div>

              <DialogFooter>
                <Button disabled={isLoading}>
                  {
                    isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                      </>
                    )
                      : (
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
            user.enrolledCourses.length === 0 ? (<h1>You haven't enrolled in any course yet</h1>) : (
              user.enrolledCourses.map((course) => (<Course course={course} key={course._id} />))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile