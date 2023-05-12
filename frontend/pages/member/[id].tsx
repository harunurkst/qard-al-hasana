import React, { ReactNode, useState } from 'react';
import DashboardLayout from '../../src/Layouts/DashboardLayout';

const MemberDetailPage=()=>{
    return(
        <>
        <div className='flex justify-center'>
            <h1 style={{fontSize:100}}>Comming soon</h1>
        </div>
        </>
    )
}

MemberDetailPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default MemberDetailPage;