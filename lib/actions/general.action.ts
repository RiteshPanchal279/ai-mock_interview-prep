import { db } from "@/firebase/admin";

export async function getInterviewByUserId(userId:string):Promise<Interview[] | null> {
   if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid userId: Must be a non-empty string');
    }
   const interviews = await db
   .collection('interviews')
   .where('userId','==',userId)  
   .orderBy('createdAt','desc')
   .get();

   return interviews.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
   })) as Interview[];
}

export async function getLatestInterview(params:GetLatestInterviewsParams):Promise<Interview[] | null> {

   const {userId,limit=20}=params;
   const interviews = await db
   .collection('interviews')
   .orderBy('createdAt', 'desc')
   .where('finalized', '==', true)
   .where('userId','!=',userId) 
   .limit(limit)
   .get();

   return interviews.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
   })) as Interview[];
}

export async function getInterviewById(id:string):Promise<Interview | null> {
  
   const interview = await db
   .collection('interviews')
   .doc(id)
   .get();

   return interview.data() as Interview | null;
}