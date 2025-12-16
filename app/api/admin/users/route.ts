import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req:Request){
  const session=await getServerSession(authOptions);
  if(!session || (session.user as any).role!=='ADMIN'){
    return Response.json({error:"Unauthorized"},{status:401});
  }
  const {userId,action}=await req.json();
  if(action=='DEACTIVATE' && userId===(session.user as any).id){
    return Response.json(
      {error:'You cannot disable yourself'},
      {status:400}
    );
  }
  switch(action){
    case 'PROMOTE':
      await prisma.user.update({
        where:{id:userId},
        data:{role:"ADMIN"},
      })
      break;
    case 'DEACTIVATE':
      await prisma.user.update({
        where:{id:userId},
        data:{isActive:false},
      })
      break;
    case 'ACTIVATE':
      await prisma.user.update({
        where:{id:userId},
        data:{isActive:true},
      })
      break;
    default:
      return Response.json({error:"Invalid action"},{status:400})
  }
  return Response.json({ok:true});
}