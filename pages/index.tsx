import { AxiosError, AxiosResponse } from 'axios';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import axios from '../utils/api';


const Index: NextPage = () => {

    const [validationError, setValidationError] = useState<string | undefined>(undefined)
    const [isLoading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const router = useRouter()

    // Callback passed to the input
    const changeInput = (val: string) => {
        setSearchTerm(val);
        // resetting validation errors on input change
        if(validationError) {
            setValidationError(undefined)
        }
    }

    // Check if username exists and if it does, checks if the user has any videos
    // posted. If the user has videos, route to the results page
    const submit = () => {
        if(!(searchTerm.length > 0)) {
            setValidationError("Please enter a username!")
            return;
        }
        setLoading(true);
        // Should have sanitized the input before sending it to the API.
        axios.get('tiktok?username=' + searchTerm).then((res : AxiosResponse) => {
            if (res.status === 200 && res?.data) {

                // Checking if the user has any videos
                let videoCount: number|undefined = res.data?.userInfo.stats?.videoCount
                if(videoCount !== undefined && videoCount === 0) {
                    setValidationError("User has no videos")
                    setLoading(false)
                    return
                }

                // Routing to the results page
                router.push(`/results/${res.data?.userInfo?.user?.secUid}?username=${searchTerm}`);
                return;
            }
        }).catch((err: AxiosError) => {
            // To-DO: Differentiate between different error types, currently it presumes all fail conditions are
            // because of no account. This will also be triggered by network or other errors
            setValidationError('Account does not exist')
            setLoading(false)
            return; 
        })

    }

    return (
        <div className='flex justify-center items-center mt-136 mx-24'>
            <div className='w-screen flex justify-center items-center flex-col'>
                <p className='md:text-display3 xs:text-display5 text-center mb-24 font-semibold'>TikTok Metrics</p>
                <p className='text-title text-center font-normal text-medium'>Find out how the Creator’s last 10 videos performed.</p>
                <div className='xs:w-[300px] md:w-[600px] mt-32'>
                    <Input validationError={validationError && validationError} onChange={changeInput}/>
                </div>
                <div className='xs:w-[300px] md:w-[600px] mt-24'>
                    <Button onClick={submit} disabled={isLoading} disabledText='Fetching Data...' buttonText="Show Performance" />
                </div>
            </div>
        </div>
    )
}


export default Index;