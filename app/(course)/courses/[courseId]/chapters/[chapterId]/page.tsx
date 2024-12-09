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
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const surveyJson = {
    title: "American History",
    pages: [{
      elements: [{
        type: "radiogroup",
        name: "civilwar",
        title: "When was the American Civil War?",
        choices: [
          "1796-1803", "1810-1814", "1861-1865", "1939-1945"
        ],
        correctAnswer: "1861-1865"
      }]
    }, {
      elements: [{
        type: "radiogroup",
        name: "libertyordeath",
        title: "Whose quote is this: \"Give me liberty, or give me death\"?",
        choicesOrder: "random",
        choices: [
          "John Hancock", "James Madison", "Patrick Henry", "Samuel Adams"
        ],
        correctAnswer: "Patrick Henry"
      }]
    }, {
      elements: [{
        type: "radiogroup",
        name: "magnacarta",
        title: "What is Magna Carta?",
        choicesOrder: "random",
        choices: [
          "The foundation of the British parliamentary system",
          "The Great Seal of the monarchs of England",
          "The French Declaration of the Rights of Man",
          "The charter signed by the Pilgrims on the Mayflower"
        ],
        correctAnswer: "The foundation of the British parliamentary system"
      }]
    }]
  };

  const survey = new Model(surveyJson);
  
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
          <Survey model={survey} />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
