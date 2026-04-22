import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Index from './pages/Index';
import NotFound from './pages/NotFound';

// New Architecture Pages
import Catalog from './pages/Catalog';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AuthorLaunchpad28 from './pages/AuthorLaunchpad28';
import WritingContests from './pages/WritingContests';
import Awards from './pages/Awards';

import PublishedAuthor from './pages/PublishedAuthor';
import LillianBlytheAuthor from './pages/LillianBlytheAuthor';
import VijayPratapAuthor from './pages/VijayPratapAuthor';
import DaniyaKhanAuthor from './pages/DaniyaKhanAuthor';
import ShreyoBiswasAuthor from './legacy-pages/ShreyoBiswasAuthor';
import BhavinTriwadiAuthor from './legacy-pages/BhavinTriwadiAuthor';
import PriyaBharathyAuthor from './legacy-pages/PriyaBharathyAuthor';
import AuthorsDirectory from './legacy-pages/AuthorsDirectory';
import RichaKAuthor from './pages/RichaKAuthor';
import AnweshaAuthor from './pages/AnweshaAuthor';
import ShikastEAzizAuthor from './legacy-pages/ShikastEAzizAuthor';
import SilfiraBook from './pages/SilfiraBook';
import AnweshaWritings from './pages/AnweshaWritings';
import AnweshaBooks from './pages/AnweshaBooks';
import BookPurchase from './pages/BookPurchase';
import AnthologyCoAuthor from './pages/AnthologyCoAuthor';
import POETFramework from './pages/POETFramework';
import BilingualPoetAdvantage from './pages/BilingualPoetAdvantage';
import WritersVault from './pages/WritersVault';
import QuestMap from './pages/QuestMap.tsx';
import LoveAtMinusOne from './pages/LoveAtMinusOne';
import IndianWritersLeague from './pages/IndianWritersLeague';
import IndianWritersLeagueSubmissionV2 from './pages/IndianWritersLeagueSubmissionV2';
import IWLAdmin from './pages/IWLAdmin';
import WritingPrompts from './pages/WritingPrompts';
import ProtectedVaultRoute from './components/ProtectedVaultRoute';
import GetPublishedIn15Days from './pages/GetPublishedIn15Days';
import LoveAnthologyRegistration from './pages/LoveAnthologyRegistration';
import LoveAnthologySubmission from './pages/LoveAnthologySubmission';
import PetalsAndScars from './pages/PetalsAndScars';
import The200KBlueprint from './pages/The200KBlueprint';
import TheWritersHabitBible from './pages/TheWritersHabitBible';
import LaunchLikeABestseller from './pages/LaunchLikeABestseller';
import PagesIntoPaychecks from './pages/PagesIntoPaychecks';
import HeartsUnderConstruction from './pages/HeartsUnderConstruction';
import HeartsUnderConstructionRegistration from './pages/HeartsUnderConstructionRegistration';
import AnthologyThankYou from './pages/AnthologyThankYou';
import AnthologyManuscript from './pages/AnthologyManuscript';
import LoveAnthologyManuscript from './pages/LoveAnthologyManuscript';

// Polyfill for process.env (Required for Periskope SDK in Vite)
if (typeof window !== 'undefined') {
  (window as any).process = (window as any).process || {};
  (window as any).process.env = (window as any).process.env || {};
}

import ShakespeareSubmission from './pages/ShakespeareSubmission';
import ShakespearePoem from './pages/ShakespearePoem';
import LoveLaunchPoll from './pages/LoveLaunchPoll';
import LoveLaunchAdmin from './pages/LoveLaunchAdmin';
import LoveAtMinusOneSubmission from './pages/LoveAtMinusOneSubmission';
import LoveAtMinusOnePoem from './pages/LoveAtMinusOnePoem';
import PortfolioOnboard from './pages/PortfolioOnboard';
import PortfolioOnboardAdmin from './pages/PortfolioOnboardAdmin';
import AuthorSite from './pages/AuthorSite';
import AuthorSiteAdmin from './pages/AuthorSiteAdmin';
import AuthorLogin from './pages/AuthorLogin';
import AuthorSignup from './pages/AuthorSignup';
import IWLTop200 from './pages/IWLTop200';

import AuthorProtectedRoute from './components/AuthorProtectedRoute';
import LoveAtMinusOneCertificate from './pages/LoveAtMinusOneCertificate';
import IWLCertificate from './pages/IWLCertificate';
import ShakespeareAndWhatRemained from './pages/ShakespeareAndWhatRemained';
import LuckyDraw from './pages/LuckyDraw';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Top-Tier Publisher Routes */}
          <Route path="/authors" element={<AuthorsDirectory />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contests" element={<WritingContests />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/launchpad" element={<AuthorLaunchpad28 />} />

          <Route path="/published/author" element={<PublishedAuthor />} />
          <Route path="/publishedauthor/shambhavi" element={<LillianBlytheAuthor />} />
          <Route path="/publishedauthor/tadashi" element={<VijayPratapAuthor />} />
          <Route path="/anthology/join" element={<AnthologyCoAuthor />} />

          <Route path="/learning/poet-framework" element={<POETFramework />} />
          <Route
            path="/learning/bilingual-advantage"
            element={
              <ProtectedVaultRoute>
                <BilingualPoetAdvantage />
              </ProtectedVaultRoute>
            }
          />
          <Route path="/writers-vault" element={<WritersVault />} />
          <Route path="/journey" element={<QuestMap />} />
          <Route path="/love-at-minus-one" element={<LoveAtMinusOne />} />
          <Route path="/love-at-minus-one/register" element={<LoveAnthologyRegistration />} />
          <Route path="/love-at-minus-one/submission" element={<LoveAnthologySubmission />} />
          <Route path="/anthology/petals-and-scars" element={<PetalsAndScars />} />
          <Route path="/anthology/hearts-under-construction" element={<HeartsUnderConstruction />} />
          <Route path="/anthology/hearts-under-construction/register" element={<HeartsUnderConstructionRegistration />} />
          <Route path="/anthology/thank-you" element={<AnthologyThankYou />} />
          <Route path="/anthology/love-at-minus-one" element={<LoveAtMinusOne />} />
          <Route path="/anthology-manuscript-view" element={<AnthologyManuscript />} />
          <Route path="/love-at-minus-one/manuscript" element={<LoveAnthologyManuscript />} />
          <Route path="/indian-writers-league" element={<IndianWritersLeague />} />
          <Route path="/iwl-top-200" element={<IWLTop200 />} />
          <Route path="/lucky-draw" element={<LuckyDraw />} />
          <Route path="/iwl-admin" element={<IWLAdmin />} />
          <Route path="/indianwritersleague/certificates" element={<IWLCertificate />} />
          <Route path="/indianwritersleague/submission/v2" element={<IndianWritersLeagueSubmissionV2 />} />
          <Route
            path="/writing-prompts"
            element={
              <ProtectedVaultRoute>
                <WritingPrompts />
              </ProtectedVaultRoute>
            }
          />
          <Route path="/learning/15-day-guide" element={<GetPublishedIn15Days />} />
          <Route
            path="/learning/launch-like-a-bestseller"
            element={
              <ProtectedVaultRoute day={3}>
                <LaunchLikeABestseller />
              </ProtectedVaultRoute>
            }
          />
          <Route
            path="/learning/200k-blueprint"
            element={
              <ProtectedVaultRoute day={2}>
                <The200KBlueprint />
              </ProtectedVaultRoute>
            }
          />
          <Route
            path="/habit-bible"
            element={
              <ProtectedVaultRoute day={2}>
                <TheWritersHabitBible />
              </ProtectedVaultRoute>
            }
          />
          <Route
            path="/learning/writers-habit-bible"
            element={
              <ProtectedVaultRoute day={2}>
                <TheWritersHabitBible />
              </ProtectedVaultRoute>
            }
          />
          <Route
            path="/learning/pages-into-paychecks"
            element={
              <ProtectedVaultRoute day={3}>
                <PagesIntoPaychecks />
              </ProtectedVaultRoute>
            }
          />
          <Route path="/book/:bookId" element={<BookPurchase />} />
          <Route path="/publishedauthor/daniya" element={<DaniyaKhanAuthor />} />
          <Route path="/publishedauthor/shreyo" element={<ShreyoBiswasAuthor />} />
          <Route path="/publishedauthor/bhavin" element={<BhavinTriwadiAuthor />} />
          <Route path="/publishedauthor/priya" element={<PriyaBharathyAuthor />} />
          <Route path="/authors" element={<AuthorsDirectory />} />
          <Route path="/publishedauthor/richa" element={<RichaKAuthor />} />
          <Route path="/publishedauthor/anwesha" element={<AnweshaAuthor />} />
          <Route path="/books/silfira" element={<SilfiraBook />} />
          <Route path="/publishedauthor/anwesha/writings" element={<AnweshaWritings />} />
          <Route path="/publishedauthor/anwesha/books" element={<AnweshaBooks />} />
          <Route path="/publishedauthor/shikast-e-aziz" element={<ShikastEAzizAuthor />} />
          <Route path="/books/shakespeare-and-what-remained" element={<ShakespeareAndWhatRemained />} />

          <Route path="/Shakespeare" element={<ShakespeareSubmission />} />
          <Route path="/Shakespeare/:id" element={<ShakespearePoem />} />
          <Route path="/loveatminusone/eventtimeanddate/poll" element={<LoveLaunchPoll />} />
          <Route path="/loveatminusone/admin/poll-results" element={<LoveLaunchAdmin />} />
          <Route path="/loveatminusone" element={<LoveAtMinusOneSubmission />} />
          <Route path="/loveatminusone/:id" element={<LoveAtMinusOnePoem />} />
          <Route path="/certificate/loveatminusone" element={<LoveAtMinusOneCertificate />} />

          <Route path="/portfoliosite/onboard" element={<PortfolioOnboard />} />
          <Route path="/portfoliosite/onboard/admin" element={<PortfolioOnboardAdmin />} />

          {/* Firebase Authed Author Portfolio Routes */}
          <Route path="/authorsite/login" element={<AuthorLogin />} />
          <Route path="/authorsite/signup" element={<AuthorSignup />} />
          <Route path="/authorsite" element={<Navigate to="/authorsite/dashboard" replace />} />
          <Route path="/authorsite/dashboard" element={<AuthorProtectedRoute><AuthorSiteAdmin /></AuthorProtectedRoute>} />

          {/* Public Author Profile URL */}
          <Route path="/author/:username" element={<AuthorSite />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
