#include <stdio.h>
#include <math.h>

int findCase(double x1,double y1,double r1,double x2,double y2, double r2);
int main()
{
    int testCase, i;
    double x1,y1,r1,x2,y2,r2;
    scanf("%d",&testCase);
    for(i=0;i<testCase;i++){
        scanf("%lf %lf %lf %lf %lf %lf",&x1,&y1,&r1,&x2,&y2,&r2);
        printf("%d\n",findCase(x1,y1,r1,x2,y2,r2));
    }
}
int findCase(double x1,double y1,double r1,double x2,double y2, double r2)
{
    double d = sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    if(x1==x2&&y1==y2)
    {
        if(r1==r2)
            if(r1==0 && r2==0)
                return 1;
            else
                return -1;
        else
            return 0;
    }
    else
    {
        if(fabs(r1-r2)>d || d>r1+r2)//만나지 않음
            return 0;
        else if(d==fabs(r1-r2) || d==r2+r1)
            return 1;
        else if(fabs(r1-r2)<d || d<r1+r2)//두 점에서 만남
            return 2;
    }
}
