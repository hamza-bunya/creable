import { AxiosError, AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../utils/api';

interface Stats {
    comments: number
    likes: number
    shares: number
    views: number
    interactionRate?: number
}

interface UserInfo {
    authorAvatarUrl?: string
    authorFollowers?: number
    displayName?: string
}

const Result : NextPage = () => {

    const [stats, setStats] = useState<Stats|undefined>(undefined);
    const [user, setUser] = useState<UserInfo>({});
    const [isLoading, setLoading] = useState(false);

    const router = useRouter()
    let param = router.query

    useEffect(() => {
        if (param.pid === undefined) {
            return;
        }
        setLoading(true);
        axios.get("tiktok/stats?uid=" + param?.pid ).then((res: AxiosResponse) => {
            
            // Double check on this page as well before the calculations
            if(!res?.data?.itemList) {
                alert('The requested user does not have any videos!')
            }

            if(res?.data?.itemList) {
                
                let tempStats: Stats = {comments: 0, likes: 0, views: 0, shares: 0}
                
                res.data.itemList.map((item : any) => {
                    tempStats.comments += item.stats.commentCount
                    tempStats.likes += item.stats.diggCount
                    tempStats.shares += item.stats.shareCount
                    tempStats.views += item.stats.playCount
                })

                let avgStats: Stats = {
                    comments: Math.floor(tempStats.comments/10),
                    likes: Math.floor(tempStats.likes/10),
                    shares: Math.floor(tempStats.shares/10),
                    views: Math.floor(tempStats.views/10),
                }

                let interactionRate = ((avgStats.comments + avgStats.likes + avgStats.shares ) / avgStats.views) * 100
                // Rounding to 2 decimal places
                avgStats.interactionRate = +interactionRate.toFixed(2)

                setStats(avgStats)

                // Lots of data being returned from the server so have to deal with long paths
                setUser({
                    authorAvatarUrl: res.data.itemList[0]?.author?.avatarThumb,
                    authorFollowers: res.data.itemList[0]?.authorStats?.followerCount,
                    displayName: res.data.itemList[0]?.author?.nickname
                })

                setLoading(false)
            }
        }).catch((err: AxiosError) => {
            // Generic catch-all block
            alert("An error occured while fetching the data!");
            setLoading(false)
        })
    },[param])

    return (
        <div className='flex mt-88 xs:mx-20 md:mx-[312px]'>
            <div className='flex flex-col'>
                <p className="font-semibold text-medium text-base leading-7">Showing data for</p>
                <p className="font-semibold text-dark-gray-900 text-2xl leading-9">tiktok.com/@{param?.username}</p>
                <div className="flex justify-center w-max items-center py-6 pl-8 pr-12 gap-8 border-gray-400 border rounded-32 mt-12">
                    <span className="w-24 h-24 rounded-full bg-black-5">
                        <img className="w-24 h-24 rounded-full" src={user.authorAvatarUrl && user.authorAvatarUrl} />
                    </span>
                    <span className="font-semibold text-subheader text-dark leading-7">{isLoading ? "Loading" : user.displayName}</span>
                </div>
                {
                    !isLoading &&
                    <div className="mt-48 grid xs:grid-rows-3 md:grid-rows-2 xs:grid-cols-2 md:grid-cols-3 border px-16 py-40 border-outline-light rounded-12">
                        <div className="flex m-24 flex-col justify-center px-16 w-176">
                            <span className="font-semibold text-caption1 text-medium">Total Followers</span>
                            <span className="font-semibold text-heading1 text-dark">{user.authorFollowers?.toLocaleString()}</span>
                        </div>
                        <div className="flex m-24 flex-col justify-center px-16 w-176">
                            <span className="font-semibold text-caption1 text-medium">Average Video Views</span>
                            <span className="font-semibold text-heading1 text-dark">{stats?.views.toLocaleString()}</span>
                        </div>
                        <div className="flex m-24 flex-col  justify-center px-16 w-176">
                            <span className="font-semibold text-caption1 text-medium">Interaction-rate</span>
                            <span className="font-semibold text-heading1 text-dark">{stats?.interactionRate?.toLocaleString()}%</span>
                        </div>
                        <div className="flex m-24 flex-col justify-center px-16 w-176">
                            <span className="font-semibold text-caption1 text-medium">Average Comments</span>
                            <span className="font-semibold text-heading1 text-dark">{stats?.comments.toLocaleString()}</span>
                        </div>
                        <div className="flex m-24 flex-col  justify-center px-16 w-176">
                            <span className="font-semibold text-caption1 text-medium">Average Likes</span>
                            <span className="font-semibold text-heading1 text-dark">{stats?.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex m-24 flex-col  justify-center px-16 w-176">
                            <span className="font-semibold text-caption1 text-medium">Average Shares</span>
                            <span className="font-semibold text-heading1 text-dark">{stats?.shares.toLocaleString()}</span>
                        </div>
                    </div>
                }
            </div>
        </div> 
    )
}


export default Result;