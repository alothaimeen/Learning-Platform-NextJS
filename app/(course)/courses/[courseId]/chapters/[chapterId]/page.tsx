import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { VideoPlayer } from "./_components/video-player";

const questions = [
  {
    id: 1,
    question: "What is your preferred learning style?",
    options: ["Visual", "Auditory", "Kinesthetic", "Reading/Writing"],
    correctAnswer: "Visual", // Correct answer for this question
  },
  {
    id: 2,
    question: "How much time can you dedicate to learning each day?",
    options: ["1 hour", "2-3 hours", "4-5 hours", "More than 5 hours"],
    correctAnswer: "2-3 hours", // Correct answer for this question
  },
];

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  // Track selected answers
  const [selectedAnswers, setSelectedAnswers] = React.useState<
    Record<number, string>
  >({});

  const handleAnswerChange = (questionId: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          <Separator />
          <div className="p-4">
            {questions.map((q) => (
              <div key={q.id} className="mb-6">
                <p className="text-lg font-medium mb-4">{q.question}</p>
                <RadioGroup
                  className="space-y-2"
                  value={selectedAnswers[q.id]}
                  onValueChange={(value) => handleAnswerChange(q.id, value)}
                >
                  {q.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem
                        id={`question-${q.id}-option-${idx}`}
                        value={option}
                        className="w-4 h-4 rounded-full border border-gray-300 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`question-${q.id}-option-${idx}`}
                        className="text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <div className="mt-4">
              <button
                onClick={() => {
                  const correctCount = checkAnswers();
                  alert(`You got ${correctCount} out of ${questions.length} correct!`);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Check Answers
              </button>
            </div>
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
