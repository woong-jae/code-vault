import { Button } from '~/app/components/Button';
import CloseButton from '~/app/components/CloseButton';

export default function SubmitWidget() {
  return (
    <>
      <CloseButton />
      <div class="flex flex-col items-center">
        <div class="mt-4">
          <svg
            class="animate-bounce"
            width="96px"
            height="96px"
            viewBox="0 0 117 117"
          >
            <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
              <g fill-rule="nonzero">
                <path
                  d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
                  fill="#17AB13"
                />

                <path
                  d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
                  fill="#4A4A4A"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="my-2 text-xl font-semibold">고생하셨습니다!</div>
        <Button content="제출하기" onClick={() => {}} />
      </div>
    </>
  );
}
