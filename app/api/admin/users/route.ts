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
      await prisma.auditLog.create({
        data:{
          userId,
          action:'PROMOTE_TO_ADMIN',
        },
      });
      break;
    case "DEMOTE":
      await prisma.user.update({
        where: { id: userId },
        data: { role: "USER" },
      });
      await prisma.auditLog.create({
        data:{
          userId,
          action:"DEMOTE_TO_USER"
        }
      })
      break;
    case 'DEACTIVATE':
      await prisma.user.update({
        where:{id:userId},
        data:{isActive:false},
      })
      await prisma.auditLog.create({
        data:{
          userId,
          action:"DEACTIVATE_USER",
        },
      });
      break;
    case 'ACTIVATE':
      await prisma.user.update({
        where:{id:userId},
        data:{isActive:true},
      })
      await prisma.auditLog.create({
        data:{
          userId,
          action:"ACITVATE_USER",
        },
      });
      break;
    default:
      return Response.json({error:"Invalid action"},{status:400})
  }
  return Response.json({ok:true});
}