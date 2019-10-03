#!/home/hbladmin/py/bin/python3
# Compress the input folder and create a zip file in output path.
# Useful in automating backups and also in copying large files over slow network.
import os, argparse, lzma, tarfile, stat, time

def comprez(folder):
    folder = os.path.abspath(folder)
    number = 1
    while True:
        xzfile = os.path.basename(folder) + '_' + str(number) + '.tar.xz'
        fPath = os.path.join(args.output, xzfile)
        if not os.path.exists(fPath):
            break
        number = number + 1
    startTime = time.time()
    print('\nBackup Started at..: ', time.strftime("%a, %d %b %Y %H:%M:%S %z"))
    print('\n\nBacking up data to: %s' % (fPath))
    xzcompre = tarfile.open(fPath, "w:xz")
    xzcompre.add(folder)
    xzcompre.close()
    endTime = time.time()
    print('\n\nBackup Ended at....: ', time.strftime("%a, %d %b %Y %H:%M:%S %z"))
    ttime = endTime-startTime
    print('\nTotal time taken to complete the Backup:', time.strftime('%H<-Hours  %M<-Minutes  %S<-Seconds', time.gmtime(endTime-startTime)))
    compre_size = os.stat(fPath).st_size
    print('\nCompressed Backup Size on output path: %s' % sizeof_fmt(compre_size),'\n \n')
def sizeof_fmt(num, suffix='B'):
    for unit in ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Yi', suffix)

parser = argparse.ArgumentParser(conflict_handler='resolve', formatter_class=argparse.RawDescriptionHelpFormatter, description='Example command for unix: python pyCompry.py -i /user/somepath -o /home/somebackuppath OR for Windows: python pyCompry.py -i d:\somepath -o e:\somebackuppath. Please refer to the documentation for more details')
parser.add_argument('-i','--input', help='Input file name',required=True)
parser.add_argument('-o','--output',help='Output file name', required=True)
args = parser.parse_args()
print ("\nInput folder.......: %s" % args.input )
print ("\nOutput folder......: %s" % args.output )
comprez(args.input)