import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./pages/NotFound"
import HomeV1 from "./pages/HomeV1"
import HomeV2 from "./pages/HomeV2"
import HomeV3 from "./pages/HomeV3"
import HomeV4 from "./pages/HomeV4"
import RunHistoryV1 from "./pages/RunHistoryV1"
import RunHistoryV2 from "./pages/RunHistoryV2"
import RunHistoryV3 from "./pages/RunHistoryV3"
import RunDetailV1 from "./pages/RunDetailV1"
import RunDetailV2 from "./pages/RunDetailV2"
import RunDetailV3 from "./pages/RunDetailV3"
import DataExplorerV1 from "./pages/DataExplorerV1"
import DataExplorerV2 from "./pages/DataExplorerV2"
import DataExplorerV3a from "./pages/DataExplorerV3a"
import DataExplorerV3b from "./pages/DataExplorerV3b"
import DataExplorerV3c from "./pages/DataExplorerV3c"
import LLMCoachReportV1 from "./pages/LLMCoachReportV1"
import LLMCoachReportV2 from "./pages/LLMCoachReportV2"
import LLMCoachReportV3 from "./pages/LLMCoachReportV3"
import DrillDetailV1 from "./pages/DrillDetailV1"
import DrillDetailV2 from "./pages/DrillDetailV2"
import DrillDetailV3 from "./pages/DrillDetailV3"
import AlertDetailV1 from "./pages/AlertDetailV1"
import AlertDetailV2 from "./pages/AlertDetailV2"
import AlertDetailV3 from "./pages/AlertDetailV3"
import ChatCoachV1a from "./pages/ChatCoachV1a"
import ChatCoachV1b from "./pages/ChatCoachV1b"
import ChatCoachV2a from "./pages/ChatCoachV2a"
import ChatCoachV2b from "./pages/ChatCoachV2b"
import ChatCoachV3a from "./pages/ChatCoachV3a"
import ChatCoachV3b from "./pages/ChatCoachV3b"
import TrainingPlanV1 from "./pages/TrainingPlanV1"
import TrainingPlanV2 from "./pages/TrainingPlanV2"
import TrainingPlanV3 from "./pages/TrainingPlanV3"
import ProposedPlanChangeV1 from "./pages/ProposedPlanChangeV1"
import ProposedPlanChangeV2 from "./pages/ProposedPlanChangeV2"
import ProposedPlanChangeV3 from "./pages/ProposedPlanChangeV3"
import FeedbackPreferencesV1 from "./pages/FeedbackPreferencesV1"
import FeedbackPreferencesV2 from "./pages/FeedbackPreferencesV2"
import FeedbackPreferencesV3 from "./pages/FeedbackPreferencesV3"
import BodyLoadVisualizationV1 from "./pages/BodyLoadVisualizationV1"
import BodyLoadVisualizationV2 from "./pages/BodyLoadVisualizationV2"
import BodyLoadVisualizationV3 from "./pages/BodyLoadVisualizationV3"
import BodyLoadVisualizationV4 from "./pages/BodyLoadVisualizationV4"
import WorkoutEditV1 from "./pages/WorkoutEditV1"
import WorkoutEditV2 from "./pages/WorkoutEditV2"
import WorkoutEditV3 from "./pages/WorkoutEditV3"
import LLMGeneratedTrainingPlanV1 from "./pages/LLMGeneratedTrainingPlanV1"
import LLMGeneratedTrainingPlanV2 from "./pages/LLMGeneratedTrainingPlanV2"
import LLMGeneratedTrainingPlanV3 from "./pages/LLMGeneratedTrainingPlanV3"
import VariationSelector from "./components/VariationSelector"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VariationSelector />} />
          <Route path="/v1" element={<HomeV1 />} />
          <Route path="/v2" element={<HomeV2 />} />
          <Route path="/v3" element={<HomeV3 />} />
          <Route path="/v4" element={<HomeV4 />} />
          <Route path="/run-history/v1" element={<RunHistoryV1 />} />
          <Route path="/run-history/v2" element={<RunHistoryV2 />} />
          <Route path="/run-history/v3" element={<RunHistoryV3 />} />
          <Route path="/run-detail/v1" element={<RunDetailV1 />} />
          <Route path="/run-detail/v2" element={<RunDetailV2 />} />
          <Route path="/run-detail/v3" element={<RunDetailV3 />} />
          <Route path="/data-explorer/v1" element={<DataExplorerV1 />} />
          <Route path="/data-explorer/v2" element={<DataExplorerV2 />} />
          <Route path="/data-explorer/v3a" element={<DataExplorerV3a />} />
          <Route path="/data-explorer/v3b" element={<DataExplorerV3b />} />
          <Route path="/data-explorer/v3c" element={<DataExplorerV3c />} />
          <Route path="/llm-coach-report/v1" element={<LLMCoachReportV1 />} />
          <Route path="/llm-coach-report/v2" element={<LLMCoachReportV2 />} />
          <Route path="/llm-coach-report/v3" element={<LLMCoachReportV3 />} />
          <Route path="/drill-detail/v1" element={<DrillDetailV1 />} />
          <Route path="/drill-detail/v2" element={<DrillDetailV2 />} />
          <Route path="/drill-detail/v3" element={<DrillDetailV3 />} />
          <Route path="/alert-detail/v1" element={<AlertDetailV1 />} />
          <Route path="/alert-detail/v2" element={<AlertDetailV2 />} />
          <Route path="/alert-detail/v3" element={<AlertDetailV3 />} />
          <Route path="/chat-coach/v1a" element={<ChatCoachV1a />} />
          <Route path="/chat-coach/v1b" element={<ChatCoachV1b />} />
          <Route path="/chat-coach/v2a" element={<ChatCoachV2a />} />
          <Route path="/chat-coach/v2b" element={<ChatCoachV2b />} />
          <Route path="/chat-coach/v3a" element={<ChatCoachV3a />} />
          <Route path="/chat-coach/v3b" element={<ChatCoachV3b />} />
          <Route path="/training-plan/v1" element={<TrainingPlanV1 />} />
          <Route path="/training-plan/v2" element={<TrainingPlanV2 />} />
          <Route path="/training-plan/v3" element={<TrainingPlanV3 />} />
          <Route path="/proposed-plan-change/v1" element={<ProposedPlanChangeV1 />} />
          <Route path="/proposed-plan-change/v2" element={<ProposedPlanChangeV2 />} />
          <Route path="/proposed-plan-change/v3" element={<ProposedPlanChangeV3 />} />
          <Route path="/feedback-preferences/v1" element={<FeedbackPreferencesV1 />} />
          <Route path="/feedback-preferences/v2" element={<FeedbackPreferencesV2 />} />
          <Route path="/feedback-preferences/v3" element={<FeedbackPreferencesV3 />} />
          <Route path="/body-load-visualization/v1" element={<BodyLoadVisualizationV1 />} />
          <Route path="/body-load-visualization/v2" element={<BodyLoadVisualizationV2 />} />
          <Route path="/body-load-visualization/v3" element={<BodyLoadVisualizationV3 />} />
          <Route path="/body-load-visualization/v4" element={<BodyLoadVisualizationV4 />} />
          <Route path="/workout-edit/v1" element={<WorkoutEditV1 />} />
          <Route path="/workout-edit/v2" element={<WorkoutEditV2 />} />
          <Route path="/workout-edit/v3" element={<WorkoutEditV3 />} />
          <Route path="/llm-generated-training-plan/v1" element={<LLMGeneratedTrainingPlanV1 />} />
          <Route path="/llm-generated-training-plan/v2" element={<LLMGeneratedTrainingPlanV2 />} />
          <Route path="/llm-generated-training-plan/v3" element={<LLMGeneratedTrainingPlanV3 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
