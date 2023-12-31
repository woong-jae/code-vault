import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@base/components/AlertDialog';
import { Button } from '@base/components/Button';
import { useAuth } from '../context';

export default function LogoutButton({ onLogout }: { onLogout?: () => void }) {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    onLogout?.();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-28" variant={'destructive'}>
          로그아웃
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 로그아웃 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            선택된 저장소가 초기화되고 자동으로 풀이를 업로드 할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
