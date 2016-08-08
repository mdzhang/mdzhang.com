# TODO: figure out how to read from data dir
describe 'Home' do
  before do
    visit '/'
  end

  it 'displays my name' do
    expect(page).to have_selector 'body div.main h1', text: 'Michelle D. Zhang'
  end

  it 'display a summary' do
    expect(page).to have_selector 'body div.main div.container p'
    within 'body div.main div.container p' do
      expect(page).to have_content
    end
  end
end
