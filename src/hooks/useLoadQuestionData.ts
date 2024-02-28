import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";

function useLoadQuestionData() {
  const { id = "" } = useParams();

  const { data, error, loading } = useRequest(async () => {
    const data = await getQuestionService(id);
    return data;
  });

  return { data, error, loading };
}

export default useLoadQuestionData;
