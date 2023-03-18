import { useGetReletedVideosQuery } from '../../../features/api/apiSlice';
import Error from '../../ui/Error';
import RelatedVideoLoader from '../../ui/loaders/RelatedVideoLoader';
import RelatedVideo from './RelatedVideo';

export default function RelatedVideos({ id, title }) {
   const { data: reletedVideos, isLoading, isError } = useGetReletedVideosQuery({ id, title });

   let content;
   if (isLoading)
      content = (
         <>
            <RelatedVideoLoader />
            <RelatedVideoLoader />
            <RelatedVideoLoader />
         </>
      );
   if (!isLoading && isError) content = <Error message={'Something went wrong'} />;
   if (!isLoading && !isError && reletedVideos.length === 0) content = <Error message={'no video found'} />;
   if (!isLoading && !isError && reletedVideos.length > 0)
      content = reletedVideos.map((video) => <RelatedVideo key={video.id} video={video} />);
   console.log(reletedVideos);

   return <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">{content}</div>;
}
