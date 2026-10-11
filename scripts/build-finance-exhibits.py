"""Rebuild the original finance PDFs and their equivalent accessible text.

Requires reportlab. Run from any directory. No textbook pages are copied.
"""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Flowable

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'exhibits' / 'corporate-finance'
OUT.mkdir(parents=True, exist_ok=True)
INK, GREEN, PALE = '#20342f', '#356b58', '#edf3ee'
BODY = ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=14, textColor=colors.HexColor(INK))
HEAD = ParagraphStyle('head', parent=BODY, fontName='Helvetica-Bold', fontSize=14, leading=18, spaceAfter=9)
SMALL = ParagraphStyle('small', parent=BODY, fontSize=9, leading=12)

class Diagram(Flowable):
    def __init__(self, labels, caption, kind='flow'):
        Flowable.__init__(self)
        self.labels, self.caption, self.kind = labels, caption, kind
        self.width, self.height = 504, 110 if kind != 'flow' else 91
    def draw(self):
        c = self.canv
        if self.kind == 'curve':
            c.setStrokeColor(colors.HexColor(GREEN))
            c.setFillColor(colors.HexColor(INK))
            c.setFont('Helvetica',8)
            c.line(60,30,464,30)
            c.line(60,30,60,98)
            c.drawString(0,94,'Spot rate (%)')
            points=[(100,43),(270,65),(440,87)]
            for i,(x,y) in enumerate(points):
                if i: c.line(*points[i-1],x,y)
                c.circle(x,y,3,fill=1,stroke=0)
                c.drawString(x+8,y+3,str(i+4)+'%')
                c.drawCentredString(x,18,str(i+1)+' year'+('s' if i else ''))
            c.drawString(181,4,'Maturity (annualized zero-coupon spot rates)')
            return
        if self.kind == 'timeline':
            c.setStrokeColor(colors.HexColor(GREEN))
            c.setFillColor(colors.HexColor(INK))
            c.setFont('Helvetica',9)
            c.line(30,66,465,66)
            for t in range(5):
                x=30+108.75*t
                c.line(x,62,x,70)
                c.drawCentredString(x,80,'t='+str(t))
            for x,label in [(30,'Pay $150'),(247.5,'Anchor'),(356.25,'Receive $121'),(465,'Receive $121')]:
                c.drawCentredString(x,43,label)
            p=Paragraph(escape(self.caption),SMALL)
            p.wrap(504,28)
            p.drawOn(c,0,3)
            return
        n = len(self.labels)
        width = (504 - (n-1)*18)/n
        for i, label in enumerate(self.labels):
            x = i*(width+18)
            c.setFillColor(colors.HexColor(PALE))
            c.setStrokeColor(colors.HexColor(GREEN))
            c.roundRect(x, 31, width, 47, 5, fill=1, stroke=1)
            p = Paragraph(escape(label).replace('|','<br/>'), SMALL)
            _, h = p.wrap(width-14, 43)
            p.drawOn(c, x+7, 31+(47-h)/2)
            if i < n-1:
                c.line(x+width+3, 54, x+width+15, 54)
                c.line(x+width+12, 57, x+width+15, 54)
                c.line(x+width+12, 51, x+width+15, 54)
        p = Paragraph(escape(self.caption), SMALL)
        p.wrap(504, 28)
        p.drawOn(c, 0, 1)

def panel(title, rows, note=''):
    return {'title': title, 'rows': rows, 'note': note}

PACKETS = [
 {'chapter':1, 'title':'Ownership, control & cash claims', 'pages':[
  {'diagram':['Shareholders|Elect the board','Board|Appoints / monitors CEO','Managers|Run operations'], 'caption':'Governance flow: ownership and day-to-day control are separate.', 'panels':[
   panel('A. Alder Tools - distribution worksheet', [
    ['Pretax corporate earnings','$1,000.00'],['Assumed corporate tax rate','20%'],['Payout policy','Distribute all after-corporate-tax earnings'],['Shares outstanding','100 identical shares'],['Maya owns','10 shares'],['Assumed dividend tax rate','25%']],
    'Hypothetical C corporation; no other taxes, fees, or deductions. Calculate corporate tax first, then the dividend tax on the amount actually distributed. Rates are exercise assumptions, not current tax rules.'),
   panel('B. Claims and funding map',[
    ['Equity','Residual claim after creditors; dividends are discretionary'],['Debt','Contractual payments; default may transfer control'],['New share issue','Investor cash flows to the issuing company'],['Investor resale','Buyer cash flows to the selling investor']],
    'Assume no personal guarantees. Limited liability protects personal assets; it does not protect the amount invested in shares.')
  ]},
  {'diagram':['Investor buys|Pays dealer ASK','Dealer quotes|Bid $20.00 / Ask $20.40','Investor sells|Receives dealer BID'], 'caption':'C. Unchanged quote; sufficient depth for 25 shares; no commission or other fees.', 'panels':[
   panel('C. Trade ticket', [['Order size','25 shares'],['Bid per share','$20.00'],['Ask per share','$20.40']], 'An immediate purchase and resale uses the ask first and the bid second. The company issues no new shares in this trade.'),
   panel('D. Fresh distribution case - Birch Works',[
    ['Pretax earnings','$2,000.00'],['Assumed corporate tax rate','25%'],['Payout policy','Distribute all after-corporate-tax earnings'],['Maya ownership','20% of identical shares'],['Assumed personal dividend tax rate','20%']],
    'Calculate the total taxes across the company and all shareholders, or Maya\'s personal cash, as requested. No other taxes or deductions.'),
   panel('E. Decision memo',[
    ['Proposal A','A project raises long-run firm value'],['Proposal B','A prestige office benefits the CEO but lowers firm value'],['Social spillover','Neither proposal\'s private cash flows price every effect on outsiders']],
    'Evaluate owner-manager incentives separately from effects on society. Bankruptcy reorganization may preserve a viable operating business.')
  ]}
 ]},
 {'chapter':2, 'title':'Alder Tools - linked financial statements', 'pages':[
  {'diagram':['Balance sheet|Position at a date','Income statement|Earnings over a year','Cash flow statement|Reconcile cash change'], 'caption':'All amounts are dollars, not thousands. Parentheses indicate outflows or deductions.', 'panels':[
   panel('A. Comparative balance sheet',[
    ['Account','Beginning of year','End of year'],['Cash','1,000','To calculate'],['Accounts receivable','800','1,000'],['Inventory','1,200','1,500'],['Net property, plant & equipment','5,000','5,300'],['Total assets','8,000','9,500'],['Accounts payable','1,000','1,100'],['Interest-bearing debt','2,500','3,000'],['Book equity','4,500','To calculate']],
    'All debt is long-term. Accounts payable is the only current liability. No other assets, liabilities, or equity adjustments. Use ending balances for ratios unless the prompt says otherwise.'),
   panel('B. Income statement - year ended',[
    ['Sales','10,000'],['Cost of goods sold','(6,000)'],['Cash operating expenses','(1,500)'],['Depreciation','(500)'],['Interest expense','(400)'],['Income tax','(400)']],
    'No other income or expense. Gross profit, EBIT, pretax income, and net income are deliberately omitted. Assumed tax rate: 25% of positive pretax income.')
  ]},
  {'diagram':['Start with net income','Adjust noncash items|and working capital','Add investing|and financing flows'], 'caption':'C. Indirect cash-flow reconciliation: use changes, not ending balances.', 'panels':[
   panel('C. Cash movements and supporting notes',[
    ['Capital expenditure paid in cash','800'],['New borrowing received in cash','500'],['Dividends paid in cash','300'],['Share issues / repurchases','None'],['Other noncash items / cash flows','None']],
    'Operating cash flow = net income + depreciation - increase in receivables - increase in inventory + increase in payables. Investing cash flow includes the equipment purchase. Financing cash flow includes the borrowing and dividends.'),
   panel('D. Market and per-share information',[
    ['Common shares throughout the year','1,000'],['Current price per share','$8.00'],['Total debt at year end','$3,000.00'],['Cash at year end','Reconcile using panels A-C']],
    'For enterprise value use debt at its stated value and subtract all cash. No preferred shares or minority interests. This is a separate scale example from Chapter 1.'),
   panel('E. Analyst reference',[
    ['Current assets','Cash + receivables + inventory'],['Quick assets','Cash + receivables (no other liquid securities)'],['Profitability','Gross profit, EBIT, or net income divided by sales'],['DuPont ROE','Net margin x sales/assets x assets/book equity'],['Collection / inventory days','Receivables/daily sales; inventory/daily cost of sales']],
    'Use 365 days for daily rates. Notes and audit opinions help assess accounting estimates and risk; a clean opinion does not guarantee the business will succeed.')
  ]}
 ]},
 {'chapter':3, 'title':'Market values, replication & NPV', 'pages':[
  {'diagram':['Today (t=0)|Value costs / benefits','Bank exchange rate|10% for one year','Year 1 (t=1)|Value costs / benefits'], 'caption':'Certain dollar cash flows. Borrowing and lending both available at 10% unless a panel states otherwise.', 'panels':[
   panel('A. Same-day materials offer',[
    ['Delivery','12 standardized units today'],['Competitive resale price','$50.00 per unit'],['Purchase cost today','$500.00']],
    'Purchase and sale are simultaneous. No transport costs, bid-ask spread, or quantity constraints. The buyer can resell every unit.'),
   panel('B. Bank and security quotes',[
    ['Reference bank deposit today','$1,000.00'],['One-year bank rate','10%'],['Bond certain payoff at t=1','$1,100.00'],['Quoted bond price today','$980.00'],['Separate certain receipt at t=1','$1,210.00']],
    'The bond and bank repayment have identical date, currency, and default risk. Borrowing is available to fund the bond purchase. Ignore trading costs and collateral restrictions.'),
   panel('C. Risk-state illustration',[
    ['Claim','Weak economy','Strong economy'],['A','0','200'],['B','200','0']],
    'Each state is equally likely. A and B have the same average payout, but their payouts occur in different economic states. Do not assume their prices are equal.')
  ]},
  {'diagram':['t=0|Machine cost $900','t=1|Receipt $1,210','t=1|Service outlay $110'], 'caption':'D. The receipt and service outlay happen on the same future date. All are certain.', 'panels':[
   panel('D. Machine proposal',[
    ['Initial equipment payment at t=0','$900.00'],['Receipt at t=1','$1,210.00'],['Required service payment at t=1','$110.00'],['Matched annual discount rate','10%'],['Other flows, taxes, transaction costs','None']],
    'Value every cost and benefit on one date. The service payment must be included even though it occurs after the purchase. Evaluate this project independently; it is not a choice between mutually exclusive projects.'),
   panel('E. Replication ledger - blank working copy',[
    ['Position','Today','Year 1'],['Buy the bond from B','Pay quoted price','Receive $1,100'],['Borrow against its payoff','Receive loan principal','Repay $1,100'],['Combined position','Calculate net cash','Compare the two flows']],
    'Borrow exactly the present value of the future repayment. An arbitrage requires no negative future net payoff and a positive payoff somewhere, after costs. A merely optimistic forecast is not arbitrage.'),
   panel('F. Transaction cost variation',[
    ['Buy one identical claim','Ask $101'],['Sell one identical claim','Bid $100'],['Observation','Last traded prices may differ from executable prices']],
    'Compare actual buying and selling prices, including fees. Without an executable profit, a displayed price discrepancy is not an arbitrage opportunity.')
  ]}
 ]},
 {'chapter':4, 'title':'Cash-flow timelines & delayed payments', 'pages':[
  {'diagram':['t=0|Deposit $1,000','t=1|No withdrawal','t=2|Receive ending balance'], 'caption':'A. A single deposit earns 10% per year with annual compounding; no tax or fees.', 'panels':[
   panel('A. Deposit / discounting',[
    ['Starting deposit at t=0','$1,000.00'],['Annual effective rate','10%'],['Separate certain receipt at t=2','$1,210.00']],
    'The deposit is made once. Distinguish the ending balance from interest earned.'),
   panel('B. Two-payment contract',[
    ['Payment received at t=1','$121.00'],['Payment received at t=2','$121.00'],['Annual effective rate','10%']],
    'No payment today. These are equal end-of-year payments. Value each cash flow at t=0 before combining them.'),
   panel('C. Endowment promise',[
    ['Level annual payment','$50.00'],['First payment','One year from today'],['Last payment','None; payments continue forever'],['Discount rate','5% per year']],
    'Separate growth variation: first payment C1, growth rate g, discount rate r. The infinite growing-stream formula requires r > g. The level-payment case has g = 0.')
  ]},
  {'diagram':['t=0|Pay $150','t=2|Valuation anchor','t=3|Receive $121','t=4|Receive $121'], 'caption':'D. Delayed contract. Annual effective discount rate: 10%. No other cash flows.', 'panels':[
   panel('D. Delayed contract inputs',[
    ['Initial purchase price at t=0','$150.00'],['First receipt at t=3','$121.00'],['Second and final receipt at t=4','$121.00'],['Effective rate per year','10%']],
    'The ordinary-annuity formula values the receipts one period before the first payment, at t=2. Move that value back two more periods to today. Keep full precision until the final cent.'),
   panel('E. Timing and payment reference',[
    ['Ordinary annuity','Equal payments at dates 1 through N'],['Annuity due','Equal payments at dates 0 through N-1'],['Payment on an amortizing loan','Principal / ordinary-annuity PV factor'],['Future savings goal','Target future value / ordinary-annuity FV factor'],['IRR','Rate making the signed cash-flow NPV zero']],
    'Cash-flow signs depend on whose perspective is used. A loan is positive at origination for the borrower and negative during repayment.'),
   panel('F. Tool and growth checks',[
    ['Spreadsheet NPV(rate, future flows)','Discounts its first listed flow by one period'],['Cash flow today','Add separately; it is not discounted'],['Rate per period','Must match the spacing of payments'],['Finite growing stream','Can be discounted term by term even when g >= r']],
    'A calculator is optional. Multiplication, division, and a two-payment timeline are enough for the numerical koans in this chapter.')
  ]}
 ]},
 {'chapter':5, 'title':'Rate quotes, loan ledger & purchasing power', 'pages':[
  {'diagram':['Quote|12% APR','Semiannual rate|APR / 2','One year|Two compounding periods'], 'caption':'A. Rate quotes describe a convention; convert to an effective rate for the cash-flow period.', 'panels':[
   panel('A. Savings quote',[
    ['Deposit today','$1,000.00'],['Quoted APR','12%'],['Compounding','Semiannual (twice per year)'],['Withdrawals, tax, fees','None']],
    'Compute a half-year balance first, then a full-year balance. Reinvest all interest. APR and EAR coincide only when compounding is annual (or the rate is zero).'),
   panel('B. Loan statement',[
    ['Opening principal before month 1','$2,000.00'],['Quoted APR','12%, compounded monthly'],['Scheduled month-end payment','$220.00'],['Extra payment in month 1','None'],['Extra payment in month 2','$100.00 after the scheduled payment'],['Fees or penalties','None']],
    'Monthly rate = APR / 12. Interest accrues on the opening balance. Each scheduled payment first covers that month\'s interest; its remainder reduces principal. The extra month-2 payment reduces principal immediately.'),
   panel('C. Borrower decision note',[
    ['Outstanding balance','PV of remaining contractual payments at the loan rate'],['Refinance comparison','Include fees, remaining term, and all changed payments'],['Teaser rate','An initial rate may reset later']],
    'A lower monthly payment alone does not establish a lower financing cost; a longer repayment term may explain the reduction.')
  ]},
  {'diagram':['1-year spot|4% annual effective','2-year spot|5% annual effective','3-year spot|6% annual effective'], 'caption':'D. Illustrative upward-sloping spot curve; each quote applies to its entire maturity.', 'panels':[
   panel('D. Spot-rate valuation',[
    ['Payment in one year','Discount by 1.04'],['Payment in two years','Discount by 1.05 squared'],['Payment in three years','Discount by 1.06 cubed']],
    'These are annualized zero-coupon spot rates, not sequential one-year rates. A flat-rate annuity shortcut does not apply directly to this nonflat curve. This is an illustration, not a current market quote.'),
   panel('E. After-tax purchasing-power case',[
    ['Deposit today','$1,000.00'],['Nominal effective annual interest rate','10%'],['Tax rate on interest only','20%, paid at year end'],['Inflation over the year','8%'],['Principal tax, fees, other flows','None']],
    'Compute gross interest, tax on that interest, after-tax ending dollars, then divide by the inflation factor to express the result in today\'s purchasing power. Carry full precision until the end.'),
   panel('F. Discount-rate matching',[
    ['Cash-flow attributes','Currency, date, risk, nominal/real, before/after tax'],['Opportunity cost','Expected return on a comparable-risk, comparable-term alternative'],['Promised risky yield','May exceed expected return because of default losses'],['Interest tax deduction','Use only when explicitly assumed usable']],
    'A risky portfolio\'s expected return is not a suitable discount rate for a guaranteed liability merely because the portfolio is intended to fund it. Retained cash also has an opportunity cost.')
  ]}
 ]}
]

def footer(canvas, doc):
    canvas.setFillColor(colors.HexColor(INK))
    canvas.setFont('Helvetica',8)
    canvas.drawString(54,31,'Original practice exhibit | Berk & DeMarzo concepts | All amounts and scenarios illustrative')
    canvas.drawRightString(558,19,f'Chapter {doc.chapter} / {doc.page}')

manifest = []
for packet in PACKETS:
    chapter=packet['chapter']
    filename=f'chapter-{chapter}.pdf'
    doc=SimpleDocTemplate(str(OUT/filename),pagesize=letter,rightMargin=54,leftMargin=54,topMargin=40,bottomMargin=48,
        title=f"Corporate Finance Chapter {chapter}: {packet['title']}",author='Snow Koans - original practice materials')
    doc.chapter=chapter
    story=[]
    transcript=[]
    for page_number,page in enumerate(packet['pages'],1):
        if page_number>1: story.append(PageBreak())
        story.append(Paragraph(f'CORPORATE FINANCE / CHAPTER {chapter}',SMALL))
        story.append(Spacer(1,7))
        story.append(Paragraph(escape(packet['title']),HEAD))
        kind = 'timeline' if chapter == 4 and page_number == 2 else 'curve' if chapter == 5 and page_number == 2 else 'flow'
        story.append(Diagram(page['diagram'],page['caption'],kind))
        transcript.extend([f'PAGE {page_number}', ' -> '.join(s.replace('|',': ') for s in page['diagram']),page['caption']])
        for section in page['panels']:
            story.append(Spacer(1,10))
            story.append(Paragraph(escape(section['title']),HEAD))
            n=len(section['rows'][0])
            widths=[310,194] if n==2 else [280,112,112]
            rows=[[Paragraph(escape(str(v)),SMALL) for v in row] for row in section['rows']]
            table=Table(rows,colWidths=widths,hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND',(0,0),(-1,-1),colors.HexColor(PALE)),
                ('LINEBELOW',(0,0),(-1,-1),.35,colors.HexColor('#cfddd2')),
                ('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),3),
                ('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),8)]))
            story.append(table)
            if section['note']:
                story.append(Spacer(1,6))
                story.append(Paragraph(escape(section['note']),SMALL))
            transcript.extend([section['title'],*[' | '.join(row) for row in section['rows']],section['note'],''])
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    manifest.append({'chapter':chapter,'url':f'exhibits/corporate-finance/{filename}',
        'title':packet['title'],'transcript':'\n'.join(transcript)})
(OUT/'exhibits.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
# Embed the accessible resource descriptions synchronously in the static site.
(ROOT/'data'/'finance-exhibits.js').write_text('window.FINANCE_EXHIBITS = '+json.dumps(manifest,indent=2)+';\n',encoding='utf-8')
print('Built five original PDFs and their text equivalents.')
